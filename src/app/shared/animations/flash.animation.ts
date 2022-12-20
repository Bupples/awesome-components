import { animate, animation, sequence, style } from '@angular/animations';

export const flashAnimation = animation([
  sequence([
    animate('{{ duration }}', style({
      'background-color': '{{ flashColor }}'
    })),
    animate('{{ duration }}', style({
      'background-color': 'black'
    }))
  ])
])
