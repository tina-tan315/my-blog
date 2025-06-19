import { supabase } from '/src/connection.js'

const list = document.querySelector('#retrospective-list')

async function loadRetrospectives() {
    const { data, error } = await supabase
        .from('weekly_retrospective')
        .select('*')
        .order('week_number', { ascending: true })

    if (error) {
        console.error('Error loading retrospectives:', error)
        list.innerHTML = '<p>Failed to load retrospectives.</p>'
        return
    }

    if (data.length === 0) {
        list.innerHTML = '<p>No retrospectives found.</p>'
        return
    }

    list.innerHTML = data.map(entry => `
        <article class="retro-entry">
            <h2>Week ${entry.week_number}</h2>
             <p><strong>What went well?</strong></p>
             <p>${entry.what_went_well}</p>
             <p><strong>What didn't go well?</strong></p>
             <p>${entry.what_didnt_go_well}</p>
            <p><strong>What can be improved?</strong></p>
            <p>${entry.improvements}</p>
            <p><strong>What actions will I take for the next sprint?</strong></p>
            <ul>
                ${entry.actions.split('\n').map(item => `<li>${item.trim()}</li>`).join('')}
            </ul>
        </article>
    `).join('')
}

loadRetrospectives()