// =========================================
// Advanced Interactivity Features
// =========================================


// Enhanced Count-Up Animations
const initEnhancedCounters = () => {
    const counters = document.querySelectorAll('[data-count]');

    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                entry.target.dataset.counted = 'true';
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
};

// Endorsement Data (Extracted from PDFs)
const endorsements = {
    math: {
        author: "Mrs. Puja Nargund - Mathematics Teacher, Cambridge School of Excellence",
        text: `
      <p><strong>To Whom It May Concern,</strong></p>
      <p>It is my distinct pleasure to write this letter of recommendation for <strong>Dev Turakhia</strong>. I have had the opportunity to teach Dev Mathematics at the Cambridge School of Excellence and have witnessed his steady academic progress and growing maturity as a learner.</p>
      <p>Dev has consistently demonstrated strong potential in Mathematics, with a quick grasp of complex concepts in algebra, calculus, and trigonometry. His predicted grade of <strong>'A'</strong> in A-Level Mathematics is a testament to his dedication and improved focus.</p>
      <p> Beyond the classroom, what distinguishes Dev is his identity as a <strong>national-level tennis player</strong>. This athletic discipline translates remarkably well into his academic life. He possesses resilience, excellent time management, and a strong sense of teamwork. In group activities, he is often the one encouraging his peers, bringing a balanced leadership style that is neither domineering nor passive.</p>
      <p>I have seen him approach assessments with intense determination, and his ability to bounce back from academic challenges mirrors his performance on the court. He is a respectful, sincere student who adds value to our school community.</p>
      <p>I am confident that Dev will continue to excel in his future endeavors and recommend him enthusiastically for his university applications.</p>
      <p>Sincerely,<br>Mrs. Puja Nargund</p>
    `
    },
    chemistry: {
        author: "Dr. Nalini Saxena - Chemistry Teacher, BVRTSE",
        text: `
      <p>It is my absolute pleasure to write this Letter of recommendation for <strong>Dev Kunal Turakhia</strong>, whom I have taught Chemistry from Grade 9 through Grade 12 at BVRISE. Over these years, I have witnessed Dev evolve from a shy and hesitant learner into a confident, independent, and intellectually vibrant young scientist. His transformation, both academically and personally, has been extraordinary, and it has been a privilege to guide and observe his growth.</p>
      <p>Dev displayed a natural curiosity for Chemistry that stood out. What were home experiments soon matured into a disciplined scientific temperament. Over the years, Dev transformed from being merely confident to being genuinely passionate about Chemistry, driven not just by the thrill of reactions but by a desire to understand, analyse, and apply chemical principles with depth and accuracy.</p>
      <p>A significant academic turning point for him was mastering qualitative analysis. Initially, sequential ion tests posed a challenge, but Dev embraced the process with perseverance. Through rigorous practice, he began performing anion cation tests with the precision and confidence of an advanced learner.</p>
      <p>In the laboratory, Dev's precision is extraordinary. His titration accuracy consistently matches the supervisor's results, often within an impressively narrow error margin. Whether performing acid-base or redox titrations, he demonstrates perfect burette control, sharp endpoint identification, and exceptional consistency in obtaining concordant readings. His practical reliability is so strong that his titration values are often used as reference points for the class.</p>
      <p>Dev extended this passion for Chemistry beyond the curriculum through <strong>ReWIRE</strong>, our school's research-based scientific program. For his ongoing project on silver nanoparticles, he has shown remarkable independence in designing experiments, analysing reaction feasibility, and interpreting his results with scientific maturity. He also demonstrated commendable confidence while performing electrophoresis during a school outreach workshop at IISER Pune, showcasing not only his technical skill but his comfort in advanced laboratory settings.</p>
      <p>Further, Dev carried out research-related experimental work at the <strong>Rajiv Gandhi Biotechnology and Information Technology College, Pune</strong>. His professionalism, laboratory safety awareness, and conceptual clarity deeply impressed the professors and postgraduate students supervising him. He was appreciated for his materials, and his ability to follow complex protocols with precision, reflecting the competence of an early undergraduate researcher.</p>
      <p>Dev's scientific reasoning is equally impressive. He independently applies concepts such as entropy changes and <strong>Gibbs free energy calculations</strong> to determine the feasibility of reactions, demonstrating analytical maturity uncommon at the high-school level. His questions reveal depth, originality, and confidence in applying thermodynamics to real-world problems.</p>
      <p>Beyond academics, Dev is a highly versatile and well-rounded student. He is a nationally ranked tennis player, enthusiastic football and basketball player, Sports Captain, Science Challenge leader for two consecutive years, BMUN Rapporteur, TED-Ed speaker, and an intern at multiple organisations including a biotechnology manufacturing facility. His ability to balance rigorous academics with excellence in sports, leadership roles, and internships speaks volumes about his discipline, time management, and intrinsic motivation.</p>
      <p>Dev embodies the qualities universities seek in strong applicants: intellectual curiosity, scientific creativity, resilience, leadership, humility, and initiative. His blend of academic strength, research aptitude, athletic excellence, and emotional maturity makes him one of the most exceptional students I have had the privilege to teach. I strongly and wholeheartedly recommend Dev for admission to your institution. I am confident that he will continue to excel, innovate, and contribute meaningfully in any academic or research environment he becomes part of.</p>
      <p>Yours sincerely,<br>Dr. Nalini Saxena</p>
    `
    },
    counselor: {
        author: "Ms. Ipsita Das - Higher Secondary Coordinator, BVRTSE",
        text: `
      <p>I am pleased to write this letter of recommendation for <strong>Dev Kunal Turakhia</strong>, whom I have had opportunity to know closely since Grade 9 at Bharati Vidyapeeth Rabindranath Tagore School of Excellence. When Dev joined the school in Grade 9, he was still developing his emotional confidence and adjusting to a new academic and social environment. Over the years, I have witnessed a marked transformation in him. Today, Dev stands out as a confident, focused, and mature young individual who approaches his responsibilities with maturity and perseverance.</p>
      <p>Dev is deeply passionate about sports, particularly tennis and football. His commitment, discipline, and enthusiasm led him to take on leadership roles, and he went on to become <strong>Sports Captain</strong> of the school. In this role, he demonstrated strong leadership skills, responsibility, and the ability to motivate and guide his peers. He has also represented school in several football tournaments, consistently displaying sportsmanship, teamwork, and resilience.</p>
      <p>Beyond Sports, Dev has shown commendable personal growth by overcoming his initial fear of public speaking. This growth was most evident when he confidently took the stage as a Speaker at a <strong>TED-style event</strong>, where he spoke on the topic "Great Expectations: Thriving in an Absurd World." His ability to articulate ideas thoughtfully and engage an audience reflected both courage and intellectual maturity.</p>
      <p>Dev has also contributed significantly to the success of <strong>BVRTSE Model United Nations</strong> by Serving on the Organising Committee. In this capacity, he demonstrated strong organisational skills, collaboration, and a sense of ownership, working diligently behind the scenes to ensure the smooth execution of the event.</p>
      <p>What truly distinguishes Dev is the quality of his relationships within the school community. He shares a strong and respectful bond not only with his peers but also with his teachers and juniors. His approachable nature, willingness to support others, and ability to lead by example have earned him admiration and trust across age groups.</p>
      <p>Through his journey at school, Dev has developed a clear understanding of the balance between pursuing his passion for sports and maintaining academic discipline. He manages his time effectively, remains focused on his studies, and consistently upholds his academic responsibilities alongside his extracurricular commitments.</p>
      <p>I strongly recommend Dev as a student of integrity, leadership, and commitment. I am confident that he will continue to grow and make meaningful contributions in any academic or professional environment he chooses to pursue.</p>
      <p>Sincerely,<br>Ms. Ipsita Das<br>School Counselor</p>
    `
    }
};

// Open Endorsement Modal
window.openEndorsement = (type) => {
    const modal = document.getElementById('endorsementModal');
    const title = document.getElementById('endorsementTitle');
    const author = document.getElementById('endorsementAuthor');
    const content = document.getElementById('endorsementText');

    if (endorsements[type]) {
        author.textContent = endorsements[type].author;
        content.innerHTML = endorsements[type].text;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
};

// Close Endorsement Modal
window.closeEndorsementModal = () => {
    const modal = document.getElementById('endorsementModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
};

// Close on outside click
window.addEventListener('click', (e) => {
    const modal = document.getElementById('endorsementModal');
    if (e.target === modal) {
        closeEndorsementModal();
    }
});

// Lazy Loading Fallback (for older browsers)
const initLazyLoading = () => {
    if ('loading' in HTMLImageElement.prototype) {
        return; // Native lazy loading supported
    }

    const images = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// Mobile Touch Indicators for Swipeable Grid
const addSwipeIndicators = () => {
    if (window.innerWidth > 768) return;

    const grid = document.querySelector('.molecular-grid');
    if (!grid || grid.children.length <= 1) return;

    // Check if grid is scrollable
    if (grid.scrollWidth > grid.clientWidth) {
        grid.classList.add('swipeable');

        // Add visual hint on first load
        const showSwipeHint = () => {
            grid.style.paddingLeft = '20px';
            setTimeout(() => {
                grid.scrollBy({ left: 50, behavior: 'smooth' });
                setTimeout(() => {
                    grid.scrollTo({ left: 0, behavior: 'smooth' });
                }, 600);
            }, 500);
        };

        // Only show hint if user hasn't scrolled yet
        let hasScrolled = false;
        grid.addEventListener('scroll', () => {
            hasScrolled = true;
        }, { once: true });

        setTimeout(() => {
            if (!hasScrolled) {
                showSwipeHint();
            }
        }, 1500);
    }
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {

    initEnhancedCounters();
    initLazyLoading();

    // Mobile features
    if (window.innerWidth <= 768) {
        addSwipeIndicators();
    }

    // Re-check on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            addSwipeIndicators();
        }
    });
});
