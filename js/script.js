'use strict';
window.addEventListener('DOMContentLoaded', () => {
    // modal open
    const openReviewModalBtn = document.querySelector('[data-src="#send-comment"]'),
          exitReviewModalBtn = document.querySelectorAll('.modal__review-exit'),
          modalReviewContent = document.querySelector('.modal-review'),
          openProgramBtn = document.querySelectorAll('.tour-program__item-btn'),
          programContent = document.querySelectorAll('.tour-program__item-text'),
          openLevelBtn = document.querySelector('.level__wrapper-btn'),
          openLevelBtnMobile = document.querySelector('.level__wrapper-btn-mobile'),
          levelModal = document.querySelector('.modal-level'),
          closeLevelBtn = document.querySelector('.modal__level-btn'),
          tourDescriptionBtn = document.querySelector('.hotel__description-more'),
          tourDescription = document.querySelector('.hotel__subdescription'),
          personalItemsBtn = document.querySelectorAll('.important-info__item-btn'),
          personaItemsText = document.querySelectorAll('.important-info__item-text'),
          moreReviewsBtn = document.querySelector('.review__wrapper-block-item-more'),
          moreReviewsContent = document.querySelectorAll('.review__wrapper-block-item-sub');


    levelModal.addEventListener('click', (e) => {
        const target = e.target;
        if(target === levelModal && !target.classList.contains('modal__level-block')) {
            levelModal.classList.remove('show');
            levelModal.classList.add('hide');
        } 
        
    })


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
            document.body.style.overflow = 'auto';
        })
    })
    openLevelBtn.addEventListener('mouseover', () => {
        levelModal.classList.remove('hide');
        levelModal.classList.add('show');
    })
    openLevelBtnMobile.addEventListener('click', () => {
        levelModal.classList.remove('hide');
        levelModal.classList.add('show');
    })
    closeLevelBtn.addEventListener('click', () => {
        levelModal.classList.remove('show');
        levelModal.classList.add('hide');
    })
    
    function openProgramContent (i = 0) {
        openProgramBtn[i].classList.toggle('active');
        programContent[i].classList.toggle('active');
    }
    function closeProgramContent () {
        
        openProgramBtn.forEach((item => {
            item.classList.remove('active');
        }));
        programContent.forEach((item => {
            item.classList.remove('active')
        }))
    };
    openProgramBtn.forEach((item,i) => {
        item.addEventListener('click', () => {
            if(item.classList.contains('active')) {
                openProgramContent(i);
                console.log('da');
            } else {
                closeProgramContent()
                openProgramContent(i);
                console.log('net');
            }
            
        })
    });
    tourDescriptionBtn.addEventListener('click', () => {
        tourDescription.classList.toggle('active');
        tourDescriptionBtn.classList.toggle('active');
    });
    function openPersonalItems (i = 0) {
        personalItemsBtn[i].classList.toggle('active');
        personaItemsText[i].classList.toggle('active');
    };
    function closePersonalItems () {
        
        personalItemsBtn.forEach((item => {
            item.classList.remove('active');
        }));
        personaItemsText.forEach((item => {
            item.classList.remove('active')
        }));
    };
    personalItemsBtn.forEach((item,i) => {
        item.addEventListener('click', () => {
            if(item.classList.contains('active')) {
                openPersonalItems(i);
            } else {
                closePersonalItems()
                openPersonalItems(i);
            };
        })
    });
    moreReviewsBtn.addEventListener('click', () => {
        moreReviewsBtn.classList.toggle('active')
        moreReviewsContent.forEach((item,i) => {
            item.classList.toggle('active');
        })
    })
});