document.addEventListener("DOMContentLoaded", function () {
    // 动画
    const lines = document.querySelectorAll('.line');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('lin-animation');
            }
        });
    }, { threshold: 0.1 });

    if (lines.length > 0) {
        lines.forEach(line => observer.observe(line));
    }


    class PRODUCTSWIPER extends HTMLElement {
        connectedCallback() {
            this.AnteSwiper()
        }
        AnteSwiper() {
            const swiper = this.querySelector(".swiper")
            const row = this.dataset.row
            new Swiper(swiper, {
                loop: true,
                slidesPerView: row,
                spaceBetween: 12,
                breakpoints: {
                    1200: {
                        slidesPerView: row,
                        spaceBetween: 12,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 12,
                    },
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                },
                pagination: {
                    el: '.swiper-pagination',  // 分页容器
                    clickable: true,  // 使分页点击有效
                },
                navigation: {
                    nextEl: '.swiper-button-next',  // 下一页按钮
                    prevEl: '.swiper-button-prev',  // 上一页按钮
                },
            })
        }
    }

    if (!window.customElements.get("product-swiper")) {
        window.customElements.define("product-swiper", PRODUCTSWIPER)
    }

    class ANTEBTNS extends HTMLElement {
        connectedCallback() {
            this.AnteBtns()
        }
        AnteBtns() {
            const targetSection = this.closest('section.ante-freaturd-product')
            const swiperElement = targetSection.querySelector('product-swiper')
            this.querySelector(".ante-btn-next").addEventListener("click", function () {
                swiperElement.querySelector(".swiper-container .swiper-button-prev").click()
            })
            this.querySelector(".ante-btn-prev").addEventListener("click", function () {
                swiperElement.querySelector(".swiper-container .swiper-button-next").click()

            })
        }
    }


    if (!window.customElements.get("ante-btns")) {
        window.customElements.define("ante-btns", ANTEBTNS)
    }

    class ANTECONTROLLER extends HTMLElement {
        connectedCallback() {
            this.AnteSwiper()
        }
        AnteSwiper() {
            const swiper_box_1 = this.querySelector(".swiper-box-frist .swiper")
            const swiper_box_2 = this.querySelector(".swiper-box-second .swiper")
            const swiper_pagination = this.querySelector(".swiper-box-frist  .swiper-pagination")
            // 找到 <script class="data-tab">
            const scriptTag = this.querySelector('.swiper-box-frist script.data-tab');
            const tabs = JSON.parse(scriptTag.textContent);
            let swiper2 = new Swiper(swiper_box_2, {
                loop: true,
                slidesPerView: 1,
                allowTouchMove: false,
                effect: "creative",
                creativeEffect: {
                    prev: {
                        shadow: true,
                        translate: [0, 0, -400],
                    },
                    next: {
                        translate: ["100%", 0, 0],
                    },
                },
            })

            let swiper1 = new Swiper(swiper_box_1, {
                loop: true,
                slidesPerView: 1,
                allowTouchMove: false,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: swiper_pagination,
                    clickable: true,
                    renderBullet: function (index, className) {
                        return `<span class="${className}" data-text="${tabs[index]}">
                        <span class="bullet-text">${tabs[index]}</span>
                        <div class="bullet-progress"></div>
                    </span>`;
                    }
                }
            })

            swiper1.controller.control = swiper2;
            swiper2.controller.control = swiper1;
        }
    }

    if (!window.customElements.get("ante-controller")) {
        window.customElements.define("ante-controller", ANTECONTROLLER)
    }

    class ANTECAROUSEL extends HTMLElement {
        connectedCallback() {
            this.AnteSwiper()
        }
        adjustLeftWidth(swiper) {
            const firstSlide = swiper.slides[0];
            const leftBox = this.parentElement.previousElementSibling;


            if (firstSlide && leftBox) {
                const slideWidth = firstSlide.offsetWidth; // Swiper 计算出来的实际宽度
                leftBox.style.width = slideWidth + 'px';
            }
        }
        AnteSwiper() {
            const swiper = this.querySelector(".swiper")
            const row = Number(this.dataset.row) || 3;
            const _this = this
            const autoplay = this.hasAttribute("data-autoplay-true")
            const inautoplayTim = Number(this.dataset.autoplay) * 1000
            let lastWidth = window.innerWidth;
            const myswiper = new Swiper(swiper, {
                loop: true,
                slidesPerView: row,
                spaceBetween: 20,
                autoplay: autoplay
                    ? {
                        delay: inautoplayTim,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true
                    }
                    : false,
                breakpoints: {
                    1200: {
                        slidesPerView: row,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    300: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    }
                }, navigation: {
                    nextEl: '.swiper-button-next',  // 下一页按钮
                    prevEl: '.swiper-button-prev',  // 上一页按钮
                },
                on: {
                    init: function () {
                        _this.adjustLeftWidth(this);
                    },
                    resize: function () {
                        const newWidth = window.innerWidth;
                        if (newWidth !== lastWidth) {
                            lastWidth = newWidth;      // 更新记录
                            this.update();             // 只在宽度真正变化时才触发
                            _this.adjustLeftWidth(this);
                        }   
                    }
                }
            })
        }

    }
    if (!window.customElements.get("ante-carousel")) {
        window.customElements.define("ante-carousel", ANTECAROUSEL)
    }
    class ANTESPEC extends HTMLElement {
        connectedCallback() {
            this.AnteSwiper()
            this.clickVariant()
        }
        AnteSwiper() {
            const template = this.querySelector("template.spe-value-ante");
            const value_arr = template.content.querySelectorAll(".ante-spe-cont");
            const box = this.querySelector(".ante-value-box")
            const swiper = this.querySelector(".swiper")
            const variat = document.querySelectorAll(".ante-icon_input")
            const swiperEl = new Swiper(swiper, {
                loop: true,
                slidesPerView: "auto",
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }, on: {
                    slideChange: (swiper) => {
                        // if (variat) {
                        //     variat[swiper.realIndex].querySelector("input").click()
                        // }
                        box.innerHTML = ""
                        const children = value_arr[swiper.realIndex].children;
                        Array.from(children).forEach(li => box.appendChild(li.cloneNode(true)));
                    }
                }
            });
        }
        clickVariant() {
            const bullet = this.querySelectorAll(".swiper-pagination-bullet")
            const template = this.querySelector("template.spe-value-ante");
            const value_arr = template.content.querySelectorAll(".ante-spe-cont");
            const box = this.querySelector(".ante-value-box")
            const variat = document.querySelectorAll(".ante-icon_input")
            if (variat.length > 0) {
                variat.forEach((el, index) => {
                    const checked = el.querySelector("input[type='radio']")
                    if (checked.checked) {
                        bullet[index].click()
                        box.innerHTML = ""
                        const children = value_arr[index].children;
                        Array.from(children).forEach(li => box.appendChild(li.cloneNode(true)));
                    }
                    el.addEventListener("click", function () {
                        bullet[index].click()
                        box.innerHTML = ""
                        const children = value_arr[index].children;
                        Array.from(children).forEach(li => box.appendChild(li.cloneNode(true)));
                    })
                })
            }
        }
    }

    if (!window.customElements.get("ante-specifications")) {
        window.customElements.define("ante-specifications", ANTESPEC)
    }
    class ANTECFGA extends HTMLElement {
        connectedCallback() {
            this.AnteSwiper()
            this.clickVariant()
            this.swiper
        }
        AnteSwiper() {
            const swiper = this.querySelector(".swiper")
            const paginationEl = this.querySelector('.swiper-pagination');
            const template = this.querySelector('#custom-bullets');
            paginationEl.innerHTML = template.innerHTML;
            const variat = document.querySelectorAll(".ante-icon_input")
            this.swiper = new Swiper(swiper, {
                loop: true,
                slidesPerView: "auto",
                // allowTouchMove: false,  // 禁用拖动
                // simulateTouch: false,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    bulletClass: 'swiper-bullet-img',
                    bulletActiveClass: 'swiper-bullet-img-active',
                    renderBullet: function (index, className) {
                        const child = paginationEl.children[index];
                        let retun_value;
                        if (paginationEl.children[index].classList.contains("svg-width")) {
                            retun_value = `<span class="${className} svg-width">${child.innerHTML}</span>`
                        } else {
                            retun_value = `<span class="${className}">${child.innerHTML}</span>`
                        }
                        console.log()
                        if (!child) return '';

                        return retun_value;
                    }
                },
                on: {
                    slideChange: (swiper) => {
                        if (variat.length > 0) {
                            variat[swiper.realIndex].querySelector("input").click()
                        }
                    }
                }
            });
            // this.swiper.on('slideChange', () => {
            //     const index = this.swiper.realIndex;
            //     const el = document.querySelectorAll(".ante-icon_input input")[index];
            //     setTimeout(() => {
            //         el.click()
            //     },10);
            // });

        }
        clickVariant() {
            const variat = document.querySelectorAll(".ante-icon_input")
            if (variat) {
                // variat.forEach((el, index) => {
                //     const checked = el.querySelector("input[type='radio']")
                //     if (checked.checked && bullet[index]) {
                //         bullet[index].click()
                //     }
                //     el.addEventListener("click", function () {
                //         if (bullet[index]) {
                //             bullet[index].click()
                //         }
                //     })
                // })
                variat.forEach((el, index) => {
                    const input = el.querySelector("input[type='radio']");

                    // 初始同步
                    if (input.checked) {
                        const event = new CustomEvent('variant:select', { bubbles: true });
                        el.dispatchEvent(event);
                    }

                    // 点击变体时
                    el.addEventListener("click", () => {
                        // 触发自定义事件，而不是直接 click
                        const event = new CustomEvent('variant:select', { bubbles: true });
                        el.dispatchEvent(event);

                        // 同步 Swiper
                        if (this.swiper.realIndex !== index) this.swiper.slideToLoop(index);
                    });
                });

            }

        }
    }

    if (!window.customElements.get("ante-configuration")) {
        window.customElements.define("ante-configuration", ANTECFGA)
    }

    class ANTENAV extends HTMLElement {
        connectedCallback() {
            this.navigation()
        }
        navigation() {
            const nav = this.querySelectorAll(".ante-btn")
            const content_box = this.nextElementSibling.querySelector(".ante-content")
            const navHeight = this.offsetHeight;
            this.nextElementSibling.style = `--nav-height:${navHeight}px`
            const sections = content_box.querySelectorAll('.ante-col-box');

            nav.forEach(btn => {
                btn.addEventListener("click", function () {
                    const targetId = btn.getAttribute("data-target");
                    const content = content_box.querySelector(`#${targetId}`);
                    content.scrollIntoView({ behavior: 'smooth' });
                });
            });
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        nav.forEach(btn => btn.classList.remove('active'));
                        const activeBtn = document.querySelector(`.ante-btn[data-target="${sectionId}"]`);
                        if (activeBtn) {
                            activeBtn.classList.add('active');
                        }
                    }
                });
            }, {
                threshold: 0.5
            });

            sections.forEach(section => observer.observe(section));
        }
    }


    if (!window.customElements.get("ante-navigation")) {
        window.customElements.define("ante-navigation", ANTENAV)
    }

    class ANTELIKE extends HTMLElement {
        connectedCallback() {
            this.AnteSwiper()
        }
        AnteSwiper() {
            const swiper = this.querySelector(".swiper")
            new Swiper(swiper, {
                loop: true,
                slidesPerView: "auto",
                breakpoints: {
                    1000: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    }
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
        }
    }
    if (!window.customElements.get("ante-like")) {
        window.customElements.define("ante-like", ANTELIKE)
    }

    class ANTECOUNT extends HTMLElement {
        connectedCallback() {
            this.AnteCount()
        }
        AnteCount() {
            const counters = this.querySelectorAll('.ante-counter');

            const parseValue = (str) => {
                const num = parseFloat(str);
                if (str.toLowerCase().includes('k')) return num * 1000;
                if (str.toLowerCase().includes('m')) return num * 1000000;
                return num;
            };

            // const formatValue = (num, raw) => {
            //     let result;
            //     if (raw.toLowerCase().includes('k')) {
            //         result = Math.round(num / 1000) + 'k';
            //     } else if (raw.toLowerCase().includes('m')) {
            //         result = (num / 1000000).toFixed(1) + 'M';
            //     } else {
            //         result = Math.round(num);
            //     }
            //     return result + '+';
            // };
            const formatValue = (num, raw) => {
                let result;
                if (raw.toLowerCase().includes('k')) {
                    result = Math.round(num / 1000) + 'k';
                } else if (raw.toLowerCase().includes('m')) {
                    // 保留一位小数，再去掉尾部的 .0
                    result = (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
                } else {
                    result = Math.round(num);
                }
                return result + '+';
            };


            const runCounter = (el) => {
                const rawTarget = el.getAttribute('data-target');
                const target = parseValue(rawTarget);
                const duration = 1500;
                const startTime = performance.now();

                const update = (now) => {
                    const progress = Math.min((now - startTime) / duration, 1);
                    const current = target * progress;
                    el.textContent = formatValue(current, rawTarget);

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                };
                requestAnimationFrame(update);
            };

            const observer = new IntersectionObserver(
                (entries, obs) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            runCounter(entry.target);
                            obs.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.3 }
            );

            counters.forEach((counter) => observer.observe(counter));
        }
    }

    if (!window.customElements.get("ante-count")) {
        window.customElements.define("ante-count", ANTECOUNT)
    }

    const product_arr = document.querySelectorAll('.accordion')
    if (product_arr.length > 0) {
        product_arr.forEach(element => {
            const btn = element.querySelector(".accordion-header")
            if (btn) [
                btn.addEventListener("click", function (e) {
                    const content = e.target.nextElementSibling;
                    if (content.style.maxHeight) {
                        // 已展开 → 收起
                        content.style.maxHeight = null;
                        element.classList.remove('open');
                    } else {
                        // 收起 → 展开
                        content.style.maxHeight = content.scrollHeight + "px";
                        element.classList.add('open');
                    }
                })
            ]
        });
    }

})