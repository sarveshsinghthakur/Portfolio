
        document.addEventListener('DOMContentLoaded', function() {
            var typed = new Typed('#typed-text', {
                strings: ['Web Developer', 'Web Designer', 'Software Developer', 'Python Developer', 'Machine Learning Enthusiast'],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 1500,
                loop: true
            });

            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    document.querySelector('.navbar').style.background = 'var(--nav-bg)';
                    document.querySelector('.navbar').style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                } else {
                    document.querySelector('.navbar').style.background = 'var(--nav-bg)';
                    document.querySelector('.navbar').style.boxShadow = 'none';
                }
                
                const backToTop = document.querySelector('.back-to-top');
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });

            const filterButtons = document.querySelectorAll('.project-filter-btn');
            const projectsContainer = document.getElementById('projects-container');
            
            fetchGitHubProjects();
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    const filter = button.getAttribute('data-filter');
                    filterProjects(filter);
                });
            });
            
            async function fetchGitHubProjects() {
                try {
                    const response = await fetch('https://api.github.com/users/sarveshsinghthakur/repos?sort=updated&per_page=20');
                    const projects = await response.json();
                    
                    projectsContainer.innerHTML = '';
                    
                    projects.forEach(project => {
                        const projectCard = createProjectCard(project);
                        projectsContainer.appendChild(projectCard);
                    });
                    
                    addMLDLProjects();
                } catch (error) {
                    console.error('Error fetching GitHub projects:', error);
                    projectsContainer.innerHTML = '<div class="col-12 text-center"><p>Unable to load projects. Please check your connection or try again later.</p></div>';
                }
            }
            
            function createProjectCard(project) {
                const col = document.createElement('div');
                col.className = 'col-md-6 col-lg-4 mb-4 project-item';
                
                let category = 'web';
                if (project.topics && project.topics.includes('machine-learning')) category = 'ml';
                if (project.topics && project.topics.includes('deep-learning')) category = 'dl';
                if (project.name.toLowerCase().includes('ml') || project.description?.toLowerCase().includes('machine learning')) category = 'ml';
                if (project.name.toLowerCase().includes('dl') || project.name.toLowerCase().includes('deep') || project.description?.toLowerCase().includes('deep learning')) category = 'dl';
                
                col.setAttribute('data-category', category);
                
                const defaultImage = category === 'ml' ? 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80' : 
                                  category === 'dl' ? 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1765&q=80' : 
                                  'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80';
                
                col.innerHTML = `
                    <div class="project-card card h-100">
                        <img src="${defaultImage}" class="card-img-top" alt="${project.name}">
                        <div class="card-body">
                            <h3>${project.name}</h3>
                            <p style="color: rgb(83, 82, 82);">${project.description || 'No description available.'}</p>
                            <div class="project-tags">
                                ${project.language ? `<span class="project-tag">${project.language}</span>` : ''}
                                <span class="project-tag">${category.toUpperCase()}</span>
                            </div>
                        </div>
                        <div class="card-footer bg-transparent border-top-0">
                            <a href="${project.html_url}" target="_blank" class="btn btn-outline-light w-100">View Project</a>
                        </div>
                    </div>
                `;
                
                return col;
            }
            
            function addMLDLProjects() {
                const mlProjects = [
                    {
                        name: "Facial Recognition Attendance System",
                        description: "Python-based facial recognition system for automated attendance tracking.",
                        url: "https://github.com/sarveshsinghthakur/Python_ATTENDENCE_by-_facial_recognition",
                        category: "ml",
                        language: "Python"
                    },
                    {
                        name: "Movie Recommendation System",
                        description: "Machine learning model that recommends movies based on user preferences.",
                        url: "https://movies-recommendation009.onrender.com/",
                        category: "ml",
                        language: "Python"
                    },
                    {
                        name: "Music Recommendation System",
                        description: "ML-based music recommendation system that suggests songs based on user input.",
                        url: "https://music-recommendation009.onrender.com/",
                        category: "ml",
                        language: "Python"
                    }
                ];
                
                const dlProjects = [
                    {
                        name: "Neural Network Image Classifier",
                        description: "Deep learning model for image classification using convolutional neural networks.",
                        url: "#",
                        category: "dl",
                        language: "Python"
                    }
                ];
                
                [...mlProjects, ...dlProjects].forEach(project => {
                    const col = document.createElement('div');
                    col.className = 'col-md-6 col-lg-4 mb-4 project-item';
                    col.setAttribute('data-category', project.category);
                    
                    const defaultImage = project.category === 'ml' ? 
                        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80' : 
                        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1765&q=80';
                    
                    col.innerHTML = `
                        <div class="project-card card h-100">
                            <img src="${defaultImage}" class="card-img-top" alt="${project.name}">
                            <div class="card-body">
                                <h3>${project.name}</h3>
                                <p style="color: rgb(83, 82, 82);">${project.description}</p>
                                <div class="project-tags">
                                    <span class="project-tag">${project.language}</span>
                                    <span class="project-tag">${project.category.toUpperCase()}</span>
                                </div>
                            </div>
                            <div class="card-footer bg-transparent border-top-0">
                                <a href="${project.url}" target="_blank" class="btn btn-outline-light w-100">View Project</a>
                            </div>
                        </div>
                    `;
                    
                    projectsContainer.appendChild(col);
                });
            }
            
            function filterProjects(filter) {
                const projects = document.querySelectorAll('.project-item');
                
                projects.forEach(project => {
                    if (filter === 'all' || project.getAttribute('data-category') === filter) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            }
            
            const animatedElements = document.querySelectorAll('.fade-in');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            animatedElements.forEach(element => {
                observer.observe(element);
            });

            document.querySelector('.back-to-top').addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = themeToggle.querySelector('.theme-icon');
            const body = document.body;
            
            const savedTheme = localStorage.getItem('theme') || 'light';
            body.setAttribute('data-theme', savedTheme);
            updateThemeButton(savedTheme);
            
            themeToggle.addEventListener('click', toggleTheme);
            
            function toggleTheme() {
                const currentTheme = body.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                updateThemeButton(newTheme);
            }
            
            function updateThemeButton(theme) {
                if (theme === 'dark') {
                    themeIcon.textContent = '☀️';
                } else {
                    themeIcon.textContent = '🌙';
                }
            }
        });
    
