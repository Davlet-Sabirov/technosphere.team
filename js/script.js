document.addEventListener("DOMContentLoaded", function () {

    // 🔹 Навигация по сайту Burger
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    window.addEventListener("scroll", () => {
        let top = window.scrollY;

        sections.forEach(sec => {
            let offset = sec.offsetTop;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => link.classList.remove('active'));

                let activeLink = document.querySelector(`header nav a[href*="${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });

    // 🔹 Закрытие бургера при клике на ссылку
    document.querySelectorAll("#offcanvasNavbar a").forEach(link => {
        link.addEventListener("click", () => {
            let offcanvasElement = document.getElementById("offcanvasNavbar");
            let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (offcanvas) {
                offcanvas.hide();
            }
        });
    });


    // 🔹 Кнопка Go_top
    let goTop = document.getElementById('go_top');
    if (goTop) {
        window.addEventListener('scroll', function () {
            goTop.classList.toggle('active', window.scrollY > 300);
        });

        // Добавляем обработчик клика для плавного возврата наверх
        goTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    };

    // 🔹 Модальные окна с изображениями
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    const modalImg = document.getElementById("modalImg");

    document.querySelectorAll(".img").forEach(img => {
        img.addEventListener("click", function () {
            modalImg.src = this.src;
            modal.show();
        });
    });

    // 🔹 Инициализация Swiper для видео

    const swiper = new Swiper('.swiper', {
        spaceBetween: 10,
        direction: 'horizontal',
        loop: true,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',
        },

        breakpoints: {
            1200: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            991: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            }
        }
    });


    document.querySelectorAll('.video-wrapper').forEach(wrapper => {
        const video = wrapper.querySelector('.video');
        const playButton = wrapper.querySelector('.play-button');

        // Клик на кнопку Play
        playButton.addEventListener('click', function (event) {
            event.stopPropagation(); // Останавливаем всплытие клика, чтобы не сработало на родителе

            // Останавливаем все остальные видео
            document.querySelectorAll('.video').forEach(v => {
                if (v !== video) {
                    v.pause();
                    v.load(); // Сбрасываем обложку видео
                    const btn = v.closest('.video-wrapper')?.querySelector('.play-button');
                    if (btn) btn.style.display = 'flex'; // Показываем кнопку Play у других видео
                }
            });

            // Запускаем текущее видео и скрываем кнопку
            video.play();
            playButton.style.display = 'none';
        });

        // Клик на видео — пауза
        video.addEventListener('click', function () {
            if (!video.paused) {
                video.pause();
                playButton.style.display = 'flex'; // Показываем кнопку Play при паузе
            }
        });

        // При окончании видео показываем кнопку Play
        video.addEventListener('ended', () => {
            playButton.style.display = 'flex';
        });
    });



    // 🔹 Раскрытие/скрытие лишнего текста с отзывами
    const textBlocks = document.querySelectorAll('.c-body');

    textBlocks.forEach((block) => {
        const text = block.querySelector('.cust-text');
        const showMoreButton = block.querySelector('.show-more');
        const showLessButton = block.querySelector('.show-less');
        const fullText = text.textContent;
        const maxLength = 100;

        const truncateText = () => {
            text.textContent = fullText.slice(0, maxLength) + '...';
            showMoreButton.style.display = 'inline-block';
            showLessButton.style.display = 'none';
        };

        const showFullText = () => {
            text.textContent = fullText;
            showMoreButton.style.display = 'none';
            showLessButton.style.display = 'inline-block';
        };

        if (fullText.length > maxLength) {
            truncateText();
        } else {
            showMoreButton.style.display = 'none';
        }

        showMoreButton.addEventListener('click', showFullText);
        showLessButton.addEventListener('click', truncateText);
    });

});