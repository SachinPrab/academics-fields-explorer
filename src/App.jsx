import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; // Import the function directly

const TopicListOrganizer = () => {
  // Handle topic suggestion submission
  const handleSuggest = (e) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    const newSuggestion = {
      text: suggestion.trim(),
      date: new Date().toISOString(),
    };
    const updatedSuggestions = [newSuggestion, ...suggestions].slice(0, 20); // keep only latest 20
    setSuggestions(updatedSuggestions);
    setSuggestion('');
    localStorage.setItem('topicSuggestions', JSON.stringify(updatedSuggestions));
  };

  // Loading state (for future async, currently always false)
  const [loading] = useState(false);
  // Modal state for topic details
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState('');
    // Move initialCategories above topicDescriptions
    const initialCategories = {
      humanities: [
        "Philosophy (including ethics, logic, metaphysics, epistemology, aesthetics)",
        "History (including historiography, cultural history, economic history, social history, intellectual history)",
        "Religious Studies, Theology, Comparative Religion",
        "Languages, Linguistics (including syntax, semantics, phonetics, sociolinguistics)",
        "Literature (including literary theory, criticism, comparative literature, poetry, prose, drama)",
        "Classics (including ancient Greek and Roman studies)",
        "Art History, Visual Culture Studies",
        "Musicology, Ethnomusicology",
        "Performance Studies, Theater Studies, Dance History",
        "Film Studies, Media Studies",
        "Cultural Studies, Area Studies (e.g., Asian Studies, African Studies)",
        "Gender and Sexuality Studies, Women's Studies, Feminist Theory",
        "LGBTQ+ Studies",
        "Critical Race Theory, Ethnic Studies, African American Studies",
        "Indigenous Studies, Postcolonial Studies",
        "Anthropology (cultural and linguistic)",
        "Archaeology, Classical Archaeology",
        "Folklore, Folk Studies, Oral Tradition",
        "Rhetoric, Composition Studies",
        "Communication Studies",
        "Digital Humanities",
        "Public History, Archives and Museum Studies",
        "Paleography, Codicology",
        "Intellectual History, History of Science, History of Medicine",
        "History of Ideas",
        "Legal Studies (humanities perspectives), Jurisprudence",
        "Political Theory, History of Political Thought",
        "Economic History",
        "History of Philosophy",
        "Aesthetics, Philosophy of Art",
        "Philosophy of History",
        "Philosophy of Language",
        "Philosophy of Mind",
        "Ethics (applied, normative, metaethics)",
        "Social Philosophy",
        "Critical Theory",
        "Structuralism, Post-structuralism",
        "Deconstruction",
        "Phenomenology, Existentialism",
        "Hermeneutics",
        "Marxist Theory",
        "Psychoanalytic Theory",
        "Postmodernism",
        "Humanistic Geography",
        "Environmental Humanities",
        "Medical Humanities",
        "History of the Book, Textual Scholarship",
        "Philology",
        "Translation Studies",
        "Heritage Studies",
        "Memory Studies, Nostalgia Studies",
        "Urban Studies (humanities approaches)",
        "Sociology of Culture",
        "Food Studies",
        "Fashion Studies",
        "History of Architecture",
        "Landscape Studies",
        "History of Ideas",
        "History of Emotions",
        "Childhood Studies",
        "Aging Studies",
        "Disability Studies",
        "Science and Technology Studies (STS) from humanities perspectives",
        "Game Studies",
        "Sound Studies",
        "Visual Studies"
      ],
      arts: [
        "Drawing",
        "Painting (oil, acrylic, watercolor, fresco, gouache)",
        "Sculpture (stone, wood, metal, clay, kinetic, assemblage)",
        "Printmaking (etching, lithography, screenprinting, woodcut)",
        "Photography (digital, analog, documentary, fine art)",
        "Ceramics, Pottery",
        "Glassblowing",
        "Stained Glass",
        "Mosaic",
        "Calligraphy",
        "Illustration",
        "Comic Art, Graphic Novels",
        "Cartooning",
        "Graffiti, Street Art",
        "Textile Arts (weaving, embroidery, quilting, tapestry)",
        "Fiber Arts",
        "Fashion Design",
        "Jewelry Design",
        "Metalworking",
        "Woodworking",
        "Paper Arts (origami, papermaking)",
        "Collage",
        "Mixed Media",
        "Installation Art",
        "Land Art, Environmental Art",
        "Public Art",
        "Digital Art",
        "Generative Art",
        "Pixel Art",
        "Vector Art",
        "3D Modeling",
        "2D Animation",
        "3D Animation",
        "Stop-Motion Animation",
        "Character Design",
        "Concept Art",
        "Storyboarding",
        "Vexillology (flag design)",
        "Typography",
        "Graphic Design",
        "Industrial Design",
        "Product Design",
        "Furniture Design",
        "Interior Design",
        "Architectural Design",
        "Urban Design",
        "Landscape Design",
        "Set Design",
        "Prop Design",
        "Makeup Artistry",
        "Special Effects (SFX)",
        "Prosthetic Makeup",
        "Body Painting",
        "Face Painting",
        "Tattoo Art",
        "Henna Art",
        "Nail Art",
        "Culinary Arts",
        "Food Styling",
        "Cake Decorating",
        "Floral Design",
        "Ikebana",
        "Bonsai",
        "Theater",
        "Acting",
        "Directing",
        "Playwriting",
        "Dramaturgy",
        "Musical Theater",
        "Opera",
        "Dance (ballet, contemporary, modern, jazz, tap, hip-hop, folk, ballroom, cultural)",
        "Choreography",
        "Performance Art",
        "Stand-Up Comedy",
        "Improvisation",
        "Circus Arts",
        "Clowning",
        "Mime",
        "Puppetry (marionette, shadow, hand)",
        "Ventriloquism",
        "Magic, Illusion",
        "Live Art",
        "Sound Art",
        "Composition",
        "Songwriting",
        "Arrangement",
        "Orchestration",
        "Conducting",
        "Performance (vocals, strings, woodwinds, brass, percussion, keyboards, electronic, folk instruments)",
        "Music Theory",
        "Ethnomusicology",
        "Musicology",
        "Music Production",
        "Sound Engineering",
        "Audio Mixing",
        "Mastering",
        "DJing",
        "Turntablism",
        "Beatmaking",
        "Electronic Music Production",
        "Film Scoring",
        "Poetry (lyric, epic, sonnet, haiku, slam)",
        "Prose Fiction (novel, novella, short story, microfiction)",
        "Prose Non-Fiction (essay, memoir, biography, literary journalism)",
        "Playwriting/Scriptwriting",
        "Screenwriting",
        "Copywriting",
        "Creative Non-Fiction",
        "Songwriting",
        "Spoken Word",
        "Storytelling",
        "Film, Cinema",
        "Directing",
        "Cinematography",
        "Videography",
        "Editing",
        "Screenwriting",
        "Sound Design",
        "Film Scoring",
        "Television Production",
        "Radio Art",
        "Broadcasting",
        "Podcasting",
        "New Media Art",
        "Video Game Art",
        "Video Game Design",
        "Interactive Art",
        "Web Art",
        "Net Art",
        "Virtual Reality (VR) Art",
        "Augmented Reality (AR) Art",
        "Motion Graphics",
        "Visual Effects (VFX)",
        "Arts Administration",
        "Art Criticism",
        "Art Curation",
        "Art Conservation",
        "Art Restoration",
        "Art History",
        "Museology",
        "Archival Science",
        "Book Arts",
        "Zine Making",
        "Craft (all forms)",
        "Artisanry",
        "Decorative Arts",
        "Advertising Art",
        "Commercial Art",
        "Packaging Design",
        "User Experience (UX) Design",
        "User Interface (UI) Design",
        "Information Design",
        "Illustration for Science/Medical/Technical fields",
        "Cartography (artistic mapmaking)",
        "Heraldry"
      ],
      appliedSciences: [
        "Acoustical Engineering",
        "Aerospace Engineering",
        "Aeronautical Engineering",
        "Agricultural Engineering",
        "Agricultural Science",
        "Agronomy",
        "Animal Science",
        "Applied Anthropology",
        "Applied Biology",
        "Applied Chemistry",
        "Applied Economics",
        "Applied Geography",
        "Applied Geology",
        "Applied Linguistics",
        "Applied Mathematics",
        "Applied Physics",
        "Applied Psychology",
        "Applied Statistics",
        "Architectural Engineering",
        "Architecture (technical aspects)",
        "Automotive Engineering",
        "Automotive Technology",
        "Aviation Science",
        "Bioinformatics",
        "Biological Engineering",
        "Biomedical Engineering",
        "Biomedical Science",
        "Biotechnology",
        "Building Science",
        "Cartography",
        "Chemical Engineering",
        "Civil Engineering",
        "Clinical Laboratory Science",
        "Clinical Psychology",
        "Cognitive Science (applied)",
        "Computer Engineering",
        "Computer Science (applied/software engineering)",
        "Construction Engineering",
        "Construction Management",
        "Corrosion Engineering",
        "Cybersecurity",
        "Data Science",
        "Dental Technology",
        "Dentistry",
        "Dietetics",
        "Earthquake Engineering",
        "Ecological Engineering",
        "Electrical Engineering",
        "Electronics Engineering",
        "Energy Engineering",
        "Engineering Geology",
        "Engineering Management",
        "Engineering Physics",
        "Environmental Engineering",
        "Environmental Science",
        "Epidemiology",
        "Ergonomics",
        "Exercise Science",
        "Fire Protection Engineering",
        "Food Engineering",
        "Food Science",
        "Forensic Science",
        "Forestry",
        "Genetic Engineering",
        "Geodesy",
        "Geoinformatics",
        "Geological Engineering",
        "Geomatics Engineering",
        "Geotechnical Engineering",
        "Hardware Engineering",
        "Horticulture",
        "Human-Computer Interaction (HCI)",
        "Hydraulic Engineering",
        "Hydrology",
        "Industrial Design (engineering)",
        "Industrial Engineering",
        "Information Systems",
        "Information Technology",
        "Irrigation Engineering",
        "Library Science",
        "Manufacturing Engineering",
        "Marine Engineering",
        "Materials Engineering",
        "Materials Science",
        "Mechanical Engineering",
        "Mechatronics",
        "Medical Imaging",
        "Medical Physics",
        "Medical Technology",
        "Metallurgical Engineering",
        "Meteorology (applied)",
        "Mining Engineering",
        "Molecular Engineering",
        "Nanotechnology",
        "Naval Architecture",
        "Network Engineering",
        "Nuclear Engineering",
        "Nursing Science",
        "Ocean Engineering",
        "Operations Research",
        "Optoelectronics",
        "Optometry",
        "Petroleum Engineering",
        "Pharmaceutical Science",
        "Pharmacognosy",
        "Pharmacy",
        "Photonics",
        "Physical Therapy",
        "Physician Assistant Studies",
        "Plant Science",
        "Plumbing Engineering",
        "Polymer Engineering",
        "Power Systems Engineering",
        "Process Engineering",
        "Prosthetics and Orthotics",
        "Psychiatric Nursing",
        "Public Health",
        "Quality Assurance Engineering",
        "Radiologic Technology",
        "Railway Engineering",
        "Rehabilitation Science",
        "Remote Sensing",
        "Robotics",
        "Safety Engineering",
        "Sanitary Engineering",
        "Software Engineering",
        "Soil Science",
        "Speech-Language Pathology",
        "Sports Science",
        "Structural Engineering",
        "Surgical Technology",
        "Surveying",
        "Systems Engineering",
        "Telecommunications Engineering",
        "Textile Engineering",
        "Therapeutic Recreation",
        "Transportation Engineering",
        "Urban Planning (technical aspects)",
        "Veterinary Medicine",
        "Veterinary Science",
        "Water Resources Engineering",
        "Web Development",
        "Welding Engineering",
        "Zoology (applied)"
      ]
    };
  // Auto-generated topic descriptions and Wikipedia links for all topics
  const topicDescriptions = (() => {
    const allTopics = [
      ...initialCategories.humanities,
      ...initialCategories.arts,
      ...initialCategories.appliedSciences
    ];
    const obj = {};
    allTopics.forEach(topic => {
      // Wikipedia link: replace spaces with underscores, remove parentheses, commas, and special chars
      let wikiTitle = topic
        .replace(/\s*\([^)]*\)/g, '') // remove parenthetical
        .replace(/,/g, '')
        .replace(/\//g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/ /g, '_');
      obj[topic] = {
        description: `Learn more about ${topic} on Wikipedia.`,
        link: `https://en.wikipedia.org/wiki/${encodeURIComponent(wikiTitle)}`
      };
    });
    return obj;
  })();

    const openModal = (topic) => {
      setModalTopic(topic);
      setModalOpen(true);
    };
    const closeModal = () => {
      setModalOpen(false);
      setModalTopic('');
    };
  const [suggestion, setSuggestion] = useState('');
  const [suggestions, setSuggestions] = useState(() => {
    const saved = localStorage.getItem('topicSuggestions');
    return saved ? JSON.parse(saved) : [];
  });

  // Theme state (dark/light)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved : 'light';
  });
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(theme === 'dark' ? 'dark-mode' : 'light-mode');
    // Set background color for light mode
    if (theme === 'light') {
      document.body.style.background = '#fff';
      document.body.style.color = '#2d3748';
    } else {
      document.body.style.background = '';
      document.body.style.color = '';
    }
  }, [theme]);
  const [categories, setCategories] = useState(initialCategories);

  const [activeCategory, setActiveCategory] = useState('humanities');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCounts, setShowCounts] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteTopics');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    localStorage.setItem('favoriteTopics', JSON.stringify(favorites));
  }, [favorites]);


  // Filter topics based on search term
  const getFilteredTopics = (category) => {
    let topics = showFavorites
      ? favorites.filter(fav => categories[category].includes(fav))
      : categories[category];
    if (!searchTerm.trim()) return topics;
    return topics.filter(topic =>
      topic.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const isFavorite = (topic) => favorites.includes(topic);
  const toggleFavorite = (topic) => {
    setFavorites((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  // Export to CSV
  const handleExportCSV = () => {
    const topics = getFilteredTopics(activeCategory);
    const csvRows = [
      'No.,Topic',
      ...topics.map((topic, idx) => `${idx + 1},"${topic.replace(/"/g, '""')}"`)
    ];
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${categoryInfo[activeCategory].title}-topics.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export to PDF
 const handleExportPDF = () => {
  const topics = getFilteredTopics(activeCategory);
  
  // 1. Ensure you use 'new jsPDF()'
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  doc.text(`${categoryInfo[activeCategory].title} Topics`, 14, 16);

  // 2. Explicitly pass 'doc' as the first argument
  autoTable(doc, {
    head: [['No.', 'Topic']],
    body: topics.map((topic, idx) => [idx + 1, topic]),
    startY: 22,
    theme: 'striped',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [79, 70, 229] },
  });

  doc.save(`${categoryInfo[activeCategory].title}-topics.pdf`);
};

  // Count total topics
  const getTotalTopics = () => {
    return Object.values(categories).reduce((total, cat) => total + cat.length, 0);
  };

  // Category metadata
  const categoryInfo = {
    humanities: { title: "Humanities", color: "#4f46e5", description: "The study of human culture, thought, and expression" },
    arts: { title: "Arts", color: "#10b981", description: "Creative disciplines and forms of expression" },
    appliedSciences: { title: "Applied Sciences", color: "#ef4444", description: "Practical application of scientific knowledge" }
  };

  return (
    <div className={`topic-organizer${theme === 'dark' ? ' dark-mode' : ''}`}> 
      {loading && <div style={{ textAlign: 'center', color: theme === 'dark' ? '#a5b4fc' : '#4f46e5', fontWeight: 600, margin: 16 }}>Loading topics...</div>}
      <header className="organizer-header">
        <h1>Comprehensive Academic Topics Directory</h1>
        <p className="total-count">Total Topics: {getTotalTopics()} across 3 major categories</p>
      </header>


       <div className="controls">
         <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
           <button
             className="clear-btn"
             aria-label="Toggle dark/light mode"
             style={{ minWidth: 48, fontSize: 18, borderRadius: 20, border: '1px solid #cbd5e0', boxShadow: theme === 'dark' ? '0 2px 8px #23272f' : '0 2px 8px #e2e8f0', transition: 'all 0.2s' }}
             onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
           >
             {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
           </button>
         </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search across all topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            style={{ fontSize: 16, borderRadius: 12, padding: 12, background: theme === 'dark' ? '#23272f' : 'white', color: theme === 'dark' ? '#f1f1f1' : '#2d3748', border: theme === 'dark' ? '2px solid #4a5568' : '2px solid #e2e8f0', transition: 'all 0.2s' }}
          />
          <button 
            onClick={() => setSearchTerm('')}
            className="clear-btn"
            style={{ borderRadius: 12 }}
          >
            Clear
          </button>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="clear-btn" style={{ background: '#4f46e5', borderRadius: 12, color: '#fff', fontWeight: 700 }} onClick={handleExportPDF}>
            Export PDF
          </button>
          <button className="clear-btn" style={{ background: '#10b981', borderRadius: 12, color: '#fff', fontWeight: 700 }} onClick={handleExportCSV}>
            Export CSV
          </button>
        </div>
        <div className="toggle-switch">
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={showCounts}
              onChange={() => setShowCounts(!showCounts)}
              style={{ accentColor: theme === 'dark' ? '#a5b4fc' : '#4f46e5', width: 20, height: 20 }}
            />
            Show Numbers
          </label>
        </div>
      </div>

      <div className="category-tabs">
        {Object.keys(categories).map(category => (
          <button
            key={category}
            onClick={() => { setActiveCategory(category); setShowFavorites(false); }}
            className={`tab-btn ${activeCategory === category && !showFavorites ? 'active' : ''}`}
            style={activeCategory === category && !showFavorites ? { backgroundColor: categoryInfo[category].color, color: '#fff', fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' } : {}}
          >
            {categoryInfo[category].title}
            <span className="topic-count">{categories[category].length}</span>
          </button>
        ))}
        <button
          onClick={() => setShowFavorites(true)}
          className={`tab-btn ${showFavorites ? 'active' : ''}`}
          style={showFavorites ? { backgroundColor: '#f59e42', color: 'white', fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' } : {}}
        >
          ★ Favorites
          <span className="topic-count">{favorites.length}</span>
        </button>
      </div>

      <div className="category-display">
        <div className="category-header">
          <h2 style={{ color: showFavorites ? '#f59e42' : categoryInfo[activeCategory].color }}>
            {showFavorites ? '★ Favorites' : categoryInfo[activeCategory].title}
          </h2>
          <p className="category-description">
            {showFavorites
              ? 'Your bookmarked topics across this category.'
              : categoryInfo[activeCategory].description}
          </p>
          <p className="filtered-count">
            Showing {getFilteredTopics(activeCategory).length} of {showFavorites ? favorites.length : categories[activeCategory].length} topics
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        <div className="topics-list-container">
          <ol className="topics-list">
             {getFilteredTopics(activeCategory).map((topic, index) => (
               <li key={index} className="topic-item">
                 {showCounts && <span className="topic-number">{index + 1}.</span>}
                 <span className="topic-text" style={{ cursor: 'pointer', textDecoration: 'underline dotted' }} onClick={() => openModal(topic)}>{topic}</span>
                 <button
                   title={isFavorite(topic) ? 'Remove from favorites' : 'Add to favorites'}
                   style={{
                     background: 'none',
                     border: 'none',
                     cursor: 'pointer',
                     fontSize: '1.3em',
                     color: isFavorite(topic) ? '#f59e42' : '#cbd5e0',
                     marginLeft: 4
                   }}
                   onClick={() => toggleFavorite(topic)}
                 >
                   {isFavorite(topic) ? '★' : '☆'}
                 </button>
               </li>
             ))}
                {/* Topic Details Modal */}
                {modalOpen && (
                  <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    background: 'rgba(0,0,0,0.35)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }} onClick={closeModal}>
                    <div style={{
                      background: 'white', color: '#2d3748', borderRadius: 12, padding: 32, minWidth: 320, maxWidth: 480, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', position: 'relative'
                    }} onClick={e => e.stopPropagation()}>
                      <button onClick={closeModal} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }}>&times;</button>
                      <h2 style={{ marginTop: 0 }}>{modalTopic}</h2>
                      {topicDescriptions[modalTopic] ? (
                        <>
                          <p style={{ color: '#4a5568' }}>{topicDescriptions[modalTopic].description}</p>
                          <a href={topicDescriptions[modalTopic].link} target="_blank" rel="noopener noreferrer" style={{ color: '#4f46e5', textDecoration: 'underline' }}>Wikipedia</a>
                        </>
                      ) : (
                        <p style={{ color: '#4a5568' }}>No description available for this topic yet.</p>
                      )}
                    </div>
                  </div>
                )}
          </ol>
        </div>
      </div>

      {/* Topic Suggestion System */}
      <div className="suggest-section">
  <h3 className="suggest-title">Suggest a New Topic</h3>

  <form className="suggest-form" onSubmit={handleSuggest}>
    <input
      type="text"
      value={suggestion}
      onChange={e => setSuggestion(e.target.value)}
      placeholder="Your topic suggestion..."
      className="suggest-input"
    />

    <button
      className="suggest-btn"
      type="submit"
      disabled={!suggestion.trim()}
    >
      Submit
    </button>
  </form>

  <div className="suggest-list-wrapper">
    <h4 className="suggest-subtitle">Recent Suggestions</h4>

    <ul className="suggest-list">
      {suggestions.length === 0 && (
        <li className="suggest-empty">No suggestions yet.</li>
      )}

      {suggestions.map((s, i) => (
        <li key={i} className="suggest-item">
          <b className="suggest-text">{s.text}</b>
          <span className="suggest-date">
            on {new Date(s.date).toLocaleDateString()}
          </span>
        </li>
      ))}
    </ul>
  </div>
</div>
      <h3>Category Statistics</h3>
      <div className="stats-grid">
        {Object.keys(categories).map(category => (
          <div key={category} className="stat-card" style={{ borderTopColor: categoryInfo[category].color }}>
            <h4>{categoryInfo[category].title}</h4>
            <div className="stat-number">{categories[category].length}</div>
            <p>topics</p>
            <div className="stat-percentage">
              {((categories[category].length / getTotalTopics()) * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicListOrganizer;