'use strict'
//TABS
window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
     const tabsParent = document.querySelector('.tabheader__items');
    
     function hideTabContent() {
         tabsContent.forEach(item => {
             item.style.display = 'none';
         })
         
         tabs.forEach(item => {
             item.classList.remove('tabheader__item_active')
         })
     };
    
     function showTabContent(i = 0) {
         tabsContent[i].style.display = 'block';
         tabs[i].classList.add('tabheader__item_active')
     };
    
     hideTabContent();
     showTabContent();
    
     tabsParent.addEventListener('click', (event) => {
         const target = event.target;
         if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
         }
     })
    
    //TIMER
    
    const deadline = '2021-09-19';
    // let deadline = '2021-08-02T15:20:00';

    function getTimeRemaining(endtime) {
        const milliseconds = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
        // const hours = Math.floor( (milliseconds / 1000 * 60 * 60) % 24);
        const hours = Math.floor( (milliseconds / 1000 / 60 / 60 % 24));
        const minutes = Math.floor((milliseconds/ 1000 /60) % 60);
        const seconds = Math.floor((milliseconds / 1000) % 60);

        return { 
            total: milliseconds,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        }
       
    }

    function setClock(selector, endtime) {
         const timer = document.querySelector(selector);
         const days = timer.querySelector('#days');
         const hours = timer.querySelector('#hours');
         const minutes = timer.querySelector('#minutes');
         const seconds = timer.querySelector('#seconds');
         const timeInterval = setInterval(updateClock, 1000);

         updateClock();

         function getZero(num) {
             if (num >= 0 && num < 10) {
                return `0${num}`
             } else {
                 return num;
             }
         }


         function updateClock() {
            const timeObj = getTimeRemaining(endtime);
            days.innerHTML = getZero(timeObj.days);
            hours.innerHTML = getZero(timeObj.hours);
            minutes.innerHTML = getZero(timeObj.minutes);
            seconds.innerHTML = getZero(timeObj.seconds);

            if(timeObj.total <= 0) {
                clearInterval(timeInterval);
            }
         }
    }
    setClock('.timer', deadline)
    //modal
   
    const modalOpenBtn = document.querySelectorAll('[data-modal]');
    const modalWindow = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('[data-close]');    

    function openModal(elem) {
        elem.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId, 50000);
    }

    function closeModal(elem) {
        elem.style.display = 'none';
        document.body.style.overflow = '';
    }

    modalOpenBtn.forEach((item) => {
        item.addEventListener('click', () => {
            openModal(modalWindow);
        })
    } );

    modalCloseBtn.addEventListener('click', () => {
            closeModal(modalWindow);
    })

    modalWindow.addEventListener('click', (event) => {
         if(event.target == modalWindow || event.target.getAttribute('data-close') == '') {
            closeModal(modalWindow);
         }
    })

    document.addEventListener('keydown', (event) => {
        if (event.key == 'Escape') {
            closeModal(modalWindow)        
        }
    })


    // const modalTimerId = setTimeout(openModal(modalWindow), 10000);
    let count = 0;

   window.addEventListener('scroll', () => {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight && count < 1) {
            openModal(modalWindow);
            count++;
        }
    })



    // Классы для карточек 

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27; 
            this.classes = classes;
            this.changeToUAN();
            this.render();
        }

        changeToUAN(){
            this.price = this.prise * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if(this.classes == false) {
                this.classes.push('menu__item')
            }

            this.classes.forEach( (className) =>
                element.classList.add(className)
            );

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:${this.price}</div>
                        <div class="menu__item-total"><span>229</span> грн/день</div>

                  
            `;
            this.parent.append(element);
        }


    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
           throw new Error(`Could not fetch ${url}, status:${res.status}`);
        }
        return await res.json()
    }

   

    // getResource('http://localhost:3000/menu')
    // .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price,}) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //         <img src=${img} alt=${altimg}>
    //                 <h3 class="menu__item-subtitle">${title}</h3>
    //                 <div class="menu__item-descr">${descr}</div>
    //                 <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">Цена:${price}</div>
    //                     <div class="menu__item-total"><span>229</span> грн/день</div>
    //         `;

    //         document.querySelector('.menu .container').append(element)
    //     });
    // }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        // 'menu__item',
        // 'big'
    );

    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price,}) => {
    //         new MenuCard(img, altimg, title, descr, price, `.menu .conteiner`).render()
    //     });
    // })


    axios.get('http://localhost:3000/menu')
        .then( data => {
                data.data.forEach(({img, altimg, title, descr, price,}) => {
                new MenuCard(img, altimg, title, descr, price, `.menu .conteiner`).render()
                });
        })



    //forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/forms/spinner.svg',
        success: 'Спасибо, скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так',
    }


    forms.forEach(item => {
        bindPostData(item)
    });


    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json()
    }

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
            console.log(data);

            showThanksModal(message.success);
            form.reset();
            statusMessage.remove();

            })
            .catch(() => {
                showThanksModal( message.failure)
            })
            .finally( () => {
                form.reset();
            })
        })
    }


function showThanksModal() {
     const prevModalDialog = document.querySelector('.modal__dialog')
     prevModalDialog.classList.add('hide');
     openModal();

     const thanksModal = document.createElement('div');
     thanksModal.classList.add('modal__dialog');
     thanksModal.innerHTML = `
     <div class = 'modal__content>
        <div class='modal__close' data-close>×</div>
        <div class='modal__title'>${message}</div>
     </div>
     `;
    document.querySelector('.modal').append(thanksModal)

    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000)

}


//slider

const slides = document.querySelectorAll('.offer__slide'),
slider = document.querySelector('.offer__slider'),
prev = document.querySelector('.offer__slider-prev'),
next = document.querySelector('.offer__slider-next'),
total = document.querySelector('#total'),
current = document.querySelector('#current'),
slidesWrapper = document.querySelector('.offer__slider-wrapper'),
slidesField = document.querySelector('.offer__slider-inner'),
width = window.getComputedStyle(slidesWrapper).width;



let slideIndex = 1;
let offset = 0;

if(slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`
} else {
    total.textContent = slides.length;
    current.textContent = slideIndex;

}


slidesField.style.width = 100 * slides.length + `%`;
slidesField.style.display = 'flex';
slidesField.style.transition = '0.6s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(item => {
    item.style.width = width;
}); 

slider.style.position = 'relative';

const indicators = document.createElement('ol'),
    dots = [];



indicators.classList.add('carousel-indicators');
indicators.style.cssText = `
position: absolute;
right: 0;
bottom: 0;
left: 0;
z-index: 15;
display: flex;
justify-content: center;
margin-right: 15%;
margin-left: 15%;
list-style: none;
`;

slider.append(indicators);

for(let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li')
    dot.setAttribute('data-slide-to', i + 1)
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;    
    `;
    if (i === 0) {
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
}



next.addEventListener('click', () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`

    if(slideIndex == slides.length){
        slideIndex = 1;
    } else {
        slideIndex++
    }

    if(slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent =  slideIndex;
    }

    dots.forEach( dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;

})

prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = +width.slice(0, width.length - 2) * (slides.length - 1)

    } else {
        offset -= +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`


    if(slideIndex == 1){
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    if(slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent =  slideIndex;
    }

    dots.forEach( dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
})

dots.forEach( (dot) => {
    dot.addEventListener('click', (event) => {
        const slideTo = event.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = +width.slice(0, width.length - 2) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`


        if(slides.length < 10) {
        current.textContent = `0${slideIndex}`;
            } else {
        current.textContent =  slideIndex;
        }

        dots.forEach( dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    })
})


})