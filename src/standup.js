import { supabase } from '/src/connection.js'

const form = document.querySelector('#standup-form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const formData = new FormData(form)

  const standup = {
    date: formData.get('date'),
    yesterday: formData.get('yesterday'),
    today: formData.get('today'),
    blockers: formData.get('blockers')
}

const { data, error } = await supabase
    .from('daily_standups')
    .insert([standup])

console.log('Supabase response:', { data, error })

if (error) {
    console.error('Submission error:', error)
    alert('Something went wrong. Check the console.')
} else {
    alert('Stand-up submitted successfully!')
    form.reset()
}
})