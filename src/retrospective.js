import { supabase } from '/src/connection.js'

const form = document.querySelector('#retrospective-form')

form.addEventListener('submit', async (e) =>{
    e.preventDefault()
    const formData = new FormData(form)

    const entry = {
        week_number: parseInt(formData.get('week_number')),
        what_went_well: formData.get('what_went_well'),
        what_didnt_go_well: formData.get('what_didnt_go_well'),
        improvements: formData.get('improvements'),
        actions: formData.get('actions')
    }

    const { error } = await supabase
        .from('weekly_retrospective')
        .insert([entry])

    if (error) {
        console.error('There is an error submitting your retrospective:', error)
        alert('Submission failed.')
    } else {
        alert('Retrospective submitted!')
        form.reset()
    }
})