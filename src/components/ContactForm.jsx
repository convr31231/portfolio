import { useId, useRef, useState } from 'react'
import {
  FORMSUBMIT_AJAX_URL,
  FORM_SUBJECT,
  formFormats,
  contactMethods,
} from '../data/site'
import { reachGoal } from '../utils/metrika'
import './ContactForm.css'

const INITIAL = {
  name: '',
  contactMethod: 'email',
  email: '',
  phone: '',
  siteFormat: '',
  task: '',
  honey: '',
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function validate(fields) {
  const errors = {}

  if (!fields.name.trim()) {
    errors.name = 'Укажите имя'
  }

  if (!fields.contactMethod) {
    errors.contactMethod = 'Выберите способ связи'
  }

  if (fields.contactMethod === 'email') {
    if (!fields.email.trim()) {
      errors.email = 'Укажите email для ответа'
    } else if (!isValidEmail(fields.email)) {
      errors.email = 'Проверьте формат email'
    }
  } else if (fields.email.trim() && !isValidEmail(fields.email)) {
    errors.email = 'Проверьте формат email'
  }

  if (fields.contactMethod === 'call') {
    if (!fields.phone.trim()) {
      errors.phone = 'Укажите телефон для звонка'
    }
  }

  if (!fields.siteFormat) {
    errors.siteFormat = 'Выберите формат сайта'
  }

  if (!fields.task.trim()) {
    errors.task = 'Кратко опишите задачу'
  }

  return errors
}

function buildPayload(fields, serviceContext) {
  const methodLabel =
    contactMethods.find((m) => m.value === fields.contactMethod)?.label ||
    fields.contactMethod

  const payload = {
    _subject: FORM_SUBJECT,
    _template: 'table',
    // Honeypot FormSubmit: поле должно оставаться пустым
    _honey: fields.honey,
    Имя: fields.name.trim(),
    'Способ связи': methodLabel,
    'Формат сайта': fields.siteFormat,
    'Описание задачи': fields.task.trim(),
  }

  if (serviceContext?.pageTitle) {
    payload['Страница услуги'] = serviceContext.pageTitle
  }

  if (serviceContext?.pageUrl) {
    payload['URL страницы'] = String(serviceContext.pageUrl).split('?')[0]
  }

  if (fields.email.trim()) {
    payload.Email = fields.email.trim()
    payload._replyto = fields.email.trim()
  }

  if (fields.phone.trim()) {
    payload.Телефон = fields.phone.trim()
  }

  return payload
}

function isFormSubmitSuccess(response, data) {
  if (!response.ok) return false
  if (data == null) return false
  if (typeof data === 'object') {
    if (data.success === false || data.success === 'false') return false
    if (data.error) return false
    if (data.success === true || data.success === 'true') return true
    if (typeof data.message === 'string' && /error|fail|invalid/i.test(data.message)) {
      return false
    }
    // FormSubmit AJAX обычно отвечает JSON с success / message
    if ('success' in data || 'message' in data) return true
  }
  return false
}

export default function ContactForm({
  packagePrefill = '',
  prefillNonce = 0,
  serviceContext = null,
  submitClassName = 'btn btn--light contact-form__submit',
}) {
  const formId = useId()
  const [fields, setFields] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState('')
  const [appliedNonce, setAppliedNonce] = useState(0)
  const formStartSent = useRef(false)

  // Подстановка пакета из тарифов без сброса остальных полей
  if (prefillNonce !== appliedNonce && packagePrefill) {
    setAppliedNonce(prefillNonce)
    setFields((prev) =>
      prev.siteFormat === packagePrefill
        ? prev
        : { ...prev, siteFormat: packagePrefill },
    )
  }

  const disabled = status === 'submitting' || status === 'success'

  const trackFormStart = () => {
    if (formStartSent.current) return
    formStartSent.current = true
    reachGoal('lead_form_start')
  }

  const onFormInteractCapture = (e) => {
    const el = e.target
    if (!el || el.name === 'honey') return
    if (el.matches?.('input, select, textarea')) {
      trackFormStart()
    }
  }

  const onChange = (e) => {
    const { name, value } = e.target
    if (name && name !== 'honey') {
      trackFormStart()
    }
    setFields((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
    if (status === 'error') {
      setStatus('idle')
      setServerMessage('')
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'submitting' || status === 'success') return

    // Honeypot: боты заполняют скрытое поле — не отправляем, имитируем успех для бота
    // Цель lead_submit_success здесь не вызываем
    if (fields.honey) {
      setStatus('success')
      return
    }

    const nextErrors = validate(fields)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0]
      const el = document.getElementById(`${formId}-${firstKey}`)
      el?.focus()
      return
    }

    setStatus('submitting')
    setServerMessage('')

    try {
      const response = await fetch(FORMSUBMIT_AJAX_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(buildPayload(fields, serviceContext)),
      })

      let data = null
      const contentType = response.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        data = await response.json()
      } else {
        const text = await response.text()
        try {
          data = JSON.parse(text)
        } catch {
          data = { message: text }
        }
      }

      // Активация FormSubmit / ошибки: success=false — цель не вызываем
      if (!isFormSubmitSuccess(response, data)) {
        throw new Error(
          (data && (data.message || data.error)) ||
            'Сервис не подтвердил приём заявки. Попробуйте ещё раз.',
        )
      }

      // Только после подтверждённого успеха FormSubmit (не при активации/ошибке)
      reachGoal('lead_submit_success')

      setStatus('success')
      setServerMessage(
        'Заявка принята сервисом отправки. Я отвечу выбранным способом связи.',
      )
    } catch (err) {
      setStatus('error')
      setServerMessage(
        err?.message ||
          'Не удалось отправить заявку. Данные сохранены — попробуйте ещё раз.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-form contact-form--success" role="status">
        <p className="contact-form__success-title">Заявка отправлена</p>
        <p className="contact-form__success-text">{serverMessage}</p>
        <p className="contact-form__success-note">
          Это подтверждение приёма формы сервисом FormSubmit, а не гарантия
          доставки письма в почтовый ящик.
        </p>
      </div>
    )
  }

  const methodHint =
    fields.contactMethod === 'call'
      ? 'Для звонка нужен телефон. Email можно указать дополнительно.'
      : 'Для ответа письмом нужен email. Телефон можно указать дополнительно.'

  return (
    <form
      className="contact-form"
      onSubmit={onSubmit}
      onFocusCapture={onFormInteractCapture}
      noValidate
      aria-describedby={status === 'error' ? `${formId}-server` : undefined}
    >
      {/* FormSubmit honeypot — не удалять, не заполнять */}
      <input
        type="text"
        name="honey"
        value={fields.honey}
        onChange={onChange}
        className="contact-form__honey ym-disable-keys"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="contact-form__field">
        <label htmlFor={`${formId}-name`}>Имя</label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          autoComplete="name"
          className="ym-disable-keys"
          value={fields.name}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${formId}-name-err` : undefined}
        />
        {errors.name && (
          <p id={`${formId}-name-err`} className="contact-form__error">
            {errors.name}
          </p>
        )}
      </div>

      <fieldset className="contact-form__fieldset">
        <legend>Предпочтительный способ связи</legend>
        <div className="contact-form__radios" id={`${formId}-contactMethod`}>
          {contactMethods.map((method) => (
            <label key={method.value} className="contact-form__radio">
              <input
                type="radio"
                name="contactMethod"
                value={method.value}
                checked={fields.contactMethod === method.value}
                onChange={onChange}
                disabled={disabled}
              />
              <span>{method.label}</span>
            </label>
          ))}
        </div>
        <p className="contact-form__hint">{methodHint}</p>
        {errors.contactMethod && (
          <p className="contact-form__error">{errors.contactMethod}</p>
        )}
      </fieldset>

      <div className="contact-form__row">
        <div className="contact-form__field">
          <label htmlFor={`${formId}-email`}>
            Email
            {fields.contactMethod === 'email' ? (
              <span className="contact-form__req" aria-hidden="true">
                *
              </span>
            ) : null}
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className="ym-disable-keys"
            value={fields.email}
            onChange={onChange}
            disabled={disabled}
            aria-required={fields.contactMethod === 'email'}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-err` : undefined}
          />
          {errors.email && (
            <p id={`${formId}-email-err`} className="contact-form__error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="contact-form__field">
          <label htmlFor={`${formId}-phone`}>
            Телефон
            {fields.contactMethod === 'call' ? (
              <span className="contact-form__req" aria-hidden="true">
                *
              </span>
            ) : null}
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className="ym-disable-keys"
            value={fields.phone}
            onChange={onChange}
            disabled={disabled}
            aria-required={fields.contactMethod === 'call'}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
          />
          {errors.phone && (
            <p id={`${formId}-phone-err`} className="contact-form__error">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="contact-form__field">
        <label htmlFor={`${formId}-siteFormat`}>Формат сайта</label>
        <select
          id={`${formId}-siteFormat`}
          name="siteFormat"
          value={fields.siteFormat}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={Boolean(errors.siteFormat)}
          aria-describedby={
            errors.siteFormat ? `${formId}-siteFormat-err` : undefined
          }
        >
          {formFormats.map((opt) => (
            <option key={opt.label} value={opt.value} disabled={opt.value === ''}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.siteFormat && (
          <p id={`${formId}-siteFormat-err`} className="contact-form__error">
            {errors.siteFormat}
          </p>
        )}
      </div>

      <div className="contact-form__field">
        <label htmlFor={`${formId}-task`}>Описание задачи</label>
        <textarea
          id={`${formId}-task`}
          name="task"
          rows={4}
          className="ym-disable-keys"
          value={fields.task}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={Boolean(errors.task)}
          aria-describedby={errors.task ? `${formId}-task-err` : undefined}
          placeholder="Расскажите о бизнесе, услугах и что нужно на сайте"
        />
        {errors.task && (
          <p id={`${formId}-task-err`} className="contact-form__error">
            {errors.task}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p id={`${formId}-server`} className="contact-form__server-error" role="alert">
          {serverMessage}
        </p>
      )}

      <button type="submit" className={submitClassName} disabled={disabled}>
        {status === 'submitting' ? 'Отправка…' : 'Отправить заявку'}
      </button>
    </form>
  )
}
