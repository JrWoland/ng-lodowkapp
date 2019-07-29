import { trigger, style, animate, transition, query, group, state } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('HomePage <=> AboutPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
        })
      ]),
      query(':enter', [
        style({
          left: '-100%',
        })
      ]),
      query(':leave', [
        style({
          left: '0%',
        })
      ]),
      group([
        query(':leave', [
          animate('400ms ease-out', style({
            left: '-100%',
          }))
        ]),
        query(':enter', [
          animate('400ms ease-out', style({
            left: '0%',
          }))
        ])
      ]),
    ]),
    transition('* <=> FilterPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', [
        style({ left: '0%' })
      ]),
      group([
        query(':leave', [
          animate('400ms ease-out', style({ left: '-100%' }))
        ]),
        query(':enter', [
          animate('400ms ease-out', style({ left: '0%' }))
        ])
      ]),
    ])
  ]);

export const listItem =
  trigger('EnterLeave', [
    state('state', style({ opacity: 1, height: '79px' })),
    transition(':enter', [
      style({ opacity: 0, height: 0 }),
      animate('0.5s 300ms ease-in')
    ]),
    transition(':leave', [
      animate('0.8s ease-out', style({ transform: 'translateY(100%)', opacity: 0 }))
    ])
  ]);

export const listItemYoutube =
  trigger('Show', [
    state('state', style({ opacity: 1, })),
    transition(':enter', [
      style({ opacity: 0 }),
      animate('1s 300ms ease-in')
    ]),
  ]);

export const deleteItem =
  trigger('Delete', [
    state('state', style({ opacity: 1, minHeight: '79px' })),
    transition(':leave', [
      animate('0.8s ease-out', style({ transform: 'translateY(-100%)', opacity: 0 }))
    ])
  ]);

export const showWidget =
  trigger('Show', [
    state('state', style({ opacity: 1 })),
    transition(':enter', [
      style({ opacity: 0 }),
      animate('0.5s')
    ])
  ]);

export const fadeIn =
  trigger('FadeIn', [
    state('up', style({ opacity: 1 })),
    transition(':enter', [
      style({ transform: 'translateY(100%)', opacity: 0 }),
      animate('0.6s 300ms ease-in')
    ])
  ]);

export const ShowOpacity =
  trigger('Show', [
    state('show', style({ opacity: 1 })),
    transition(':enter', [
      style({ opacity: 0 }),
      animate('1s')
    ])
  ]);

