/** ID счётчика Яндекс Метрики */
export const METRIKA_ID = 113531752

/**
 * Безопасный вызов цели Метрики.
 * Не передаёт персональные данные — только имя цели.
 * Ошибка или блокировка Метрики не должна ломать сайт.
 */
export function reachGoal(goalName) {
  if (!goalName || typeof goalName !== 'string') return
  try {
    window.ym?.(METRIKA_ID, 'reachGoal', goalName)
  } catch {
    // ignore
  }
}

/**
 * Учёт клиентских переходов (History API) без дубля первого просмотра.
 * Сейчас у сайта нет React Router — полный загрузка страницы учитывается в ym init.
 * Хэш-якоря (#contact и т.п.) не считаем отдельными просмотрами.
 */
export function trackClientHit(url) {
  try {
    if (typeof window.ym !== 'function') return
    const nextUrl = url || `${window.location.pathname}${window.location.search}`
    window.ym(METRIKA_ID, 'hit', nextUrl, {
      referer: document.referrer,
      title: document.title,
    })
  } catch {
    // ignore
  }
}
