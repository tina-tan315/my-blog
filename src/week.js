import { supabase } from '/src/connection.js'

const params = new URLSearchParams(window.location.search)
const week = parseInt(params.get('week'), 10) || 1
document.getElementById('week-heading').textContent = `Week ${week}`

function getWeekNumber(dateStr, startDate = '2025-04-28') {
  const oneDay = 1000 * 60 * 60 * 24
  const start = new Date(startDate)
  const date = new Date(dateStr)
  const diffDays = Math.floor((date - start) / oneDay)
  return Math.floor(diffDays / 7) + 1
}

async function loadStandups() {
  const { data, error } = await supabase.from('daily_standups').select('*')
  if (error) {
    console.error(error)
    return
  }

  const filtered = data.filter(entry => getWeekNumber(entry.date) === week)
  const container = document.getElementById('standup-list')

  if (!filtered.length) {
    container.innerHTML = '<p>No stand-ups yet for this week.</p>'
    return
  }

  container.innerHTML = filtered.map(entry => `
    <article class="standup-entry">
      <h3>${new Date(entry.date).toLocaleDateString('en-NZ', { weekday: 'long' })}, ${new Date(entry.date).toLocaleDateString('en-NZ')}</h3>
      <p><strong>What did I accomplish yesterday?</strong></p>
      <p>${entry.yesterday}</p>
      <p><strong>What will I do today?</strong></p>
      <p>${entry.today}</p>
      <p><strong>Are there any blockers?</strong></p>
      <p>${entry.blockers}</p>
    </article>
  `).join('')
}

async function loadRetrospective() {
  const { data, error } = await supabase
    .from('weekly_retrospective')
    .select('*')

  if (error) {
    console.error(error)
    return
  }

  const entry = data.find(entry => entry.week_number === week)
  const container = document.getElementById('retrospective-box')

  if (!entry) {
    container.innerHTML = '<p>No retrospective yet for this week.</p>'
    return
  }

  container.innerHTML = `
    <article class="retro-entry">
      <h2>Week ${entry.week_number}</h2>
      <p><strong>What went well?</strong></p>
      <p>${entry.what_went_well}</p>
      <p><strong>What didn't go well:</strong></p>
      <p>${entry.what_didnt_go_well}</p>
      <p><strong>What can be improved?</strong></p>
      <p>${entry.improvements}</p>
      <p><strong>What actions will I take for the next sprint?</strong></p>
      <ul>
        ${entry.actions.split('\n').map(item => `<li>${item.trim()}</li>`).join('')}
      </ul>
    </article>
  `
}

loadStandups()
loadRetrospective()