const myMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (myMobile.Android() || 
                myMobile.BlackBerry() || 
                myMobile.iOS() || 
                myMobile.Opera() || 
                myMobile.Windows());
    }
};

if( myMobile.any() ) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0) {
        for(let index = 0; index < menuArrows.length; index++) {
            const menuArrows = menuArrows[index];
            menuArrows.addEventListener("click", function(e) {
                menuArrows.parentElement.classList.toggle('_active');
            });
            
        }
    }

  } else {
    document.body.classList.add('_pc');
  }
  // Меню бургер
  // Получаем наш объект
  const iconMenu = document.querySelector('.menu__icon'); // ищем класс .menu__icon
  const menuBody = document.querySelector('.menu__body');
  // Делаем проверку есть ли у нас вообще такой класс))
  if (iconMenu) {
    // теперь создаю событие клик по иконке
    iconMenu.addEventListener("click", function(e) {
        document.body.classList.toggle('_lock'); // запрещаем скрол при открытом меню
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
  }
  // Прокрутка при клике

  const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
  if (menuLinks.length > 0) {
    menuLinks.forEach(menuLinks => {
        menuLinks.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            // Если обьект иконки меню содержит класс _active (фактически значит что меню открыто)
            if (iconMenu.classList.contains('_active')) {
                // то в этот момент мы должны сделать следующее
                document.body.classList.remove('_lock'); // убираем классы которые мы добавляем при открытии меню
                iconMenu.classList.remove('_active'); // убираем классы которые мы добавляем при открытии меню
                menuBody.classList.remove('_active'); // убираем классы которые мы добавляем при открытии меню
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });    
            e.preventDefault();
        }
    }
  }