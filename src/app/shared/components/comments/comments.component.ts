import { animate, animateChild, group, query, stagger, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comment } from '../../../core/models/comment.model';
import { slideAndFadeAnimation } from '../../animations/slide-and-fade.animation';
import { flashAnimation } from './../../animations/flash.animation';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@listItem', [
          stagger(200, [
            animateChild()
          ])
        ])
      ])
    ]),
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'black',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        'background-color': 'gray',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),
      transition(':enter', [
        query('.comment-text, .comment-date', [
          style({
            opacity: 0
          })
        ]),
        useAnimation(slideAndFadeAnimation, {
          params: {
            duration: '1000ms',
            startColor: 'gray'
          }
        }),
        group([
          useAnimation(flashAnimation, {
            params: {
              duration: '1000ms',
              flashColor: 'gray'
            }
          }),
          query('.comment-text', [
            animate('250ms', style({
              opacity: 1
            }))
          ]),
          query('.comment-date', [
            animate('500ms', style({
              opacity: 1
            }))
          ])
        ])
      ])
    ]
    )]
})
export class CommentsComponent implements OnInit {
  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>();

  commentCtrl!: FormControl;
  animationStates: { [key: number]: 'default' | 'active' } = {};

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]);
    for (let index in this.comments) {
      this.animationStates[index] = 'default';
    }
  }

  public onLeaveComment(): void {
    if (this.commentCtrl.invalid) {
      return;
    }
    const maxId = Math.max(...this.comments.map(comment => comment.id));
    this.comments.unshift({
      id: maxId + 1,
      comment: this.commentCtrl.value,
      createdDate: new Date().toISOString(),
      userId: 1
    });
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
  }

  public onListItemMouseEnter(index: number): void {
    this.animationStates[index] = 'active';
  }

  public onListItemMouseLeave(index: number): void {
    this.animationStates[index] = 'default';
  }
}
