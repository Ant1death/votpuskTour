'use strict';
window.addEventListener('DOMContentLoaded', () => {
    // modal open
    const openReviewModalBtn = document.querySelector('[data-src="#send-comment"]'),
          exitReviewModalBtn = document.querySelectorAll('.modal__review-exit'),
          modalReviewContent = document.querySelector('.modal__review'),
          modalTourConent = document.querySelector('.modal__tour');

    openReviewModalBtn.addEventListener('click', (e) => {
        e.preventDefault;
        modalReviewContent.classList.remove('hide');
        modalReviewContent.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    exitReviewModalBtn.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault;
            modalReviewContent.classList.remove('show');
            modalReviewContent.classList.add('hide');
            modalTourConent.classList.remove('show');
            modalTourConent.classList.add('hide');
            document.body.style.overflow = 'auto';
        })
    })

    // modal toggle active btn

    const submitBtn = document.querySelector('.modal__review-submit'),
          nameInput = document.querySelector('.modal__review-name'),
          textInput = document.querySelector('.modal__review-text'),
          captchaInput = document.querySelector('.modal__review-captcha-input');

    nameInput.addEventListener('change', () => {
        if(nameInput.value !== '' && textInput.value !== '' && captchaInput.value !== '' ) {
            submitBtn.classList.add('active');
        } else {
            submitBtn.classList.remove('active');
        }
    })
    textInput.addEventListener('change', () => {
        if(nameInput.value !== '' && textInput.value !== '' && captchaInput.value !== '' ) {
            submitBtn.classList.add('active');
        } else {
            submitBtn.classList.remove('active');
        }
    })
    captchaInput.addEventListener('change', () => {
        if(nameInput.value !== '' && textInput.value !== '' && captchaInput.value !== '' ) {
            submitBtn.classList.add('active');
        } else {
            submitBtn.classList.remove('active');
        }
    })
    
});