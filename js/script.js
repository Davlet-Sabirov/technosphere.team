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
});