import { supabase } from '/src/connection.js'

const list = document.querySelector('#standup-list')

async function loadStandups() {
    const { data, error } = await supabase
        .from('daily_standups')
        .select('*')
        // .order('date', { ascending: false })

    if (error) {
        console.error('There is an error loading stand-ups:', error)
        list.innerHTML = '<p>Failed to load stand-ups.</p>' 
        return
    }

    console.log('Loaded stand-ups:', data)

    if (!data || data.length === 0) {
        console.warn('No stand-ups found.')
        list.innerHTML = '<p>No stand-ups yet.</p>'
        return
    }

    list.innerHTML = data.map(entry => {
        const formattedDate = entry.date
            ? `${new Date(entry.date).toLocaleDateString('en-NZ', { weekday: 'long' })}, ${new Date(entry.date).toLocaleDateString('en-NZ')}`
            : '(no date)'
        return `
            <article class="standup-entry">
                <h2>${formattedDate}</h2>
                <p><strong>What did I accomplish yesterday?</strong></p> 
                <p>${entry.yesterday}</p>
                <p><strong>What will I do today?</strong></p>
                <p>${entry.today}</p>
                <p><strong>Are there any blockers?</strong></p>
                <p>${entry.blockers}</p>
            </article>
        `
    }).join('')
}

loadStandups()