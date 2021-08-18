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
        console.log(target);
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
        elem.style.display = 'block'
        document.body.style.overflow = 'hidden';
        // clearInterval(modalTimerId);
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
         if(event.target == modalWindow) {
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
        constructor(src, alt, titel, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.titel = titel;
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
            console.log(this.classes);

            this.classes.forEach( (className) =>
                element.classList.add(className)
            );

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.titel}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:${this.price}</div>
                        <div class="menu__item-total"><span>229</span> грн/день</div>

                  
            `;
            this.parent.append(element);
        }


    }
 
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














});



