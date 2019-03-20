'use strict';

document.addEventListener( 'DOMContentLoaded', function( event ) {

    //*********************************************************//
    //SWIPE MOBILE CATEGORIES MENU
    //*********************************************************//
    ( function() {

        const nav = document.querySelector( '.nav' );

        let xDown = null;
        let yDown = null;

        function handleTouchStart( event ) {
            if ( window.innerWidth > 640 ) { return; }
            xDown = event.touches[ 0 ].clientX;
            yDown = event.touches[ 0 ].clientY;
        };

        function handleTouchMove( event ) {
            if ( ! xDown || ! yDown ) {
                return;
            }

            const xUp = event.touches[ 0 ].clientX;
            const yUp = event.touches[ 0 ].clientY;

            const xDiff = xDown - xUp;
            const yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) + Math.abs( yDiff ) > 30 ) { //to deal with to short swipes

                if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                    if ( xDiff > 0 ) {/* left swipe */
                         console.log(xDiff);
                         nav.removeAttribute( 'active' );
                    } else {/* right swipe */
                         console.log(xDiff);
                         nav.setAttribute( 'active', '' );
                    }
                } else {
                    if ( yDiff > 0 ) {/* up swipe */
                    } else { /* down swipe */
                    }
                }
                /* reset values */
                xDown = null;
                yDown = null;
            }
        };

        nav.addEventListener( 'touchstart' , handleTouchStart, false );
        nav.addEventListener( 'touchmove' , handleTouchMove, false );
    } () );

    //*********************************************************//
    //LAZY LOAD IMAGES
    //*********************************************************//
    ( function() {

        const lazyLoadImg = new IntersectionObserver(

            function( entries ) {

                for ( let i = 0; i < entries.length; i++  ) {

                    const entry = entries[ i ];
                    const target = entry.target;

                    if ( entry.isIntersecting && target.hasAttribute( 'data-lazy-load' ) ) {

                        if ( target.nodeName === 'IMG' ) {

                            target.setAttribute( 'src', target.getAttribute( 'data-lazy-load' ) );
                        } else if ( target.nodeName === 'SOURCE' ) {

                            target.setAttribute( 'srcset', target.getAttribute( 'data-lazy-load' ) );
                        } else {

                            target.style.backgroundImage = 'url(' + target.getAttribute( 'data-lazy-load' ) + ')';
                        }

                        target.removeAttribute( 'data-lazy-load' )

                        lazyLoadImg.unobserve( target );

                        target.style.opacity = 1;
                    }
                }
            },
            {
                root: null,
                rootMargin: ( window.innerHeight / 2 ) + 'px ' + ( window.innerWidth / 2 ) + 'px',
                threshold: [ 0 ],
            }
        );

        // Start observing an element
        const lazyLoadImgElems = document.querySelectorAll( '[ data-lazy-load ]' );

        for ( let i = 0; i < lazyLoadImgElems.length; i++  ) {

            lazyLoadImg.observe( lazyLoadImgElems[ i ] );

            lazyLoadImgElems[ i ].style.opacity = 0;
            lazyLoadImgElems[ i ].style.transition = '.5s';
        }

    } () );

    document.querySelector( 'html' ).classList.remove( 'no-js');
} );
