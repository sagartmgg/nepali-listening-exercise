document.addEventListener('DOMContentLoaded', () => {
    // --- DATABASE OF VIDEOS ---
    // To add a new video, copy the structure below and add it to the 'lessons' array.
    // - id: a unique name (no spaces)
    // - title: The name that appears in the dropdown menu.
    // - videoId: The ID from the YouTube video URL (e.g., from 'https://www.youtube.com/watch?v=VIDEO_ID')
    // - vocabulary: An array of 'word: definition' strings.
    const lessons = [
        {
            id: 'nepali_story_1',
            title: 'बर्खा मा तातो पकौडावाली | Nepali Stories',
            videoId: 'oktl4gCOTDY', // Example YouTube video ID
            vocabulary: [

                '-- From 1:45 to 2:10 --',
                'bigboss - (a tv show)',
                'miss bhayo - missed (happened missed)',
                'repeat aairaheko hola - may be coming on repeat (about the episodes)',
                'jau na - lets go',
                'herau - lets see',
                'aaraamle - comfortably',
                'thaalnu - start / begin',
                'yeseri - just like this',
                'bitnu - pass as in day passes',
                '"kaam" ko silsila maa - in the course of "work"',
                'khojnu - try',
                '-- From 2:10 to 2:37 --',
                'nikkai - dherai ',
                'byawasta milaaunu - make arrangement',
                'jati - approx / around',
                'sadhai ko laagi - forever',
                'biwaah garnu - get married',
                'dhoom dhaam le - with great pomp',
                'mukh bangyaunu - make faces as in "frown"',
                'maathi - on/ upon',
                'anyaay garnu - do injustice',
            ]
            
        },
        {
            id: 'nepali_story_2',
            title: 'Nai Nabhannu la 2',
            videoId: 'nWoj-5CtB78', // Example YouTube video ID
            vocabulary: [
                'Thulo aakhaale - with big eyes',
                'Bhandaihunuhunchha - is saying',
                'Antim maa - at last',
                'Teti bela - until then',
                'Bhaauju - sister-in-law',
                'Kursi - chair',
                'Taannu - pull',
                'Jaska kaaran - due to which',
                'Ladnu - fall',
                'Tero - your',
            ]
        },
        {
            id: 'nepali_story_1',
            title: 'बर्खा मा तातो पकौडावाली | Nepali Stories',
            videoId: 'oktl4gCOTDY', // Example YouTube video ID
            vocabulary: [
                'Thulo aakhaale - with big eyes',
                'Bhandaihunuhunchha - is saying',
                'Antim maa - at last',
                'Teti bela - until then',
                'Bhaauju - sister-in-law',
                'Kursi - chair',
                'Taannu - pull',
                'Jaska kaaran - due to which',
                'Ladnu - fall',
                'Tero - your',
            ]
        },
        {
            id: 'nepali_story_1',
            title: 'बर्खा मा तातो पकौडावाली | Nepali Stories',
            videoId: 'oktl4gCOTDY', // Example YouTube video ID
            vocabulary: [
                'Thulo aakhaale - with big eyes',
                'Bhandaihunuhunchha - is saying',
                'Antim maa - at last',
                'Teti bela - until then',
                'Bhaauju - sister-in-law',
                'Kursi - chair',
                'Taannu - pull',
                'Jaska kaaran - due to which',
                'Ladnu - fall',
                'Tero - your',
            ]
        },

        {
            id: 'market_conversation',
            title: 'Market Conversation',
            videoId: 'another_video_id', // Replace with a real YouTube ID
            vocabulary: [
                'Kati ho? - How much?',
                'Molmilau - to bargain',
                'Sasto - cheap',
                'Mahango - expensive',
                'Tarkari - vegetables',
            ]
        },
        {
            id: 'market_conversation',
            title: 'Market Conversation',
            videoId: 'another_video_id', // Replace with a real YouTube ID
            vocabulary: [
                'Kati ho? - How much?',
                'Molmilau - to bargain',
                'Sasto - cheap',
                'Mahango - expensive',
                'Tarkari - vegetables',
            ]
        },
        
    ];

    const videoSelect = document.getElementById('video-select');
    const videoPlayer = document.getElementById('video-player');
    const vocabList = document.getElementById('vocab-list');
    const transcriptionInput = document.getElementById('transcription-input');
    const translationInput = document.getElementById('translation-input');

    let currentLessonId = '';

    // Populate the dropdown with lessons from our database
    function populateSelector() {
        lessons.forEach(lesson => {
            const option = document.createElement('option');
            option.value = lesson.id;
            option.textContent = lesson.title;
            videoSelect.appendChild(option);
        });
    }

    // Load a lesson based on the selected ID
    function loadLesson(lessonId) {
        const lesson = lessons.find(l => l.id === lessonId);
        if (!lesson) return;

        currentLessonId = lesson.id;

        // 1. Update Video
        videoPlayer.src = `https://www.youtube.com/embed/${lesson.videoId}`;

        // 2. Update Vocabulary
        vocabList.innerHTML = ''; // Clear old list
        lesson.vocabulary.forEach(item => {
    if (item.startsWith('--')) {
        vocabList.innerHTML += `<span class="vocab-section-label">${item.replace(/--/g, '').trim()}</span>`;
    } else {
        vocabList.innerHTML += `<li>${item}</li>`;
    }
});


        // 3. Load saved work for this lesson
        loadProgress();
    }

    // Save the student's input to localStorage
    function saveProgress() {
        if (!currentLessonId) return;
        const progress = {
            transcription: transcriptionInput.value,
            translation: translationInput.value
        };
        // Save the progress under a key unique to the current lesson
        localStorage.setItem(`progress_${currentLessonId}`, JSON.stringify(progress));
    }

    // Load saved input from localStorage
    function loadProgress() {
        if (!currentLessonId) return;
        const savedProgress = localStorage.getItem(`progress_${currentLessonId}`);
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            transcriptionInput.value = progress.transcription || '';
            translationInput.value = progress.translation || '';
        } else {
            // If no saved progress, clear the text areas
            transcriptionInput.value = '';
            translationInput.value = '';
        }
    }

    // EVENT LISTENERS
    // When the user types, save their work
    transcriptionInput.addEventListener('input', saveProgress);
    translationInput.addEventListener('input', saveProgress);

    // When the user changes the lesson, load the new one
    videoSelect.addEventListener('change', (e) => {
        loadLesson(e.target.value);
    });

    // --- INITIALIZATION ---
    populateSelector();
    // Load the first lesson in the list by default
    if (lessons.length > 0) {
        videoSelect.value = lessons[0].id;
        loadLesson(lessons[0].id);
    }
});
