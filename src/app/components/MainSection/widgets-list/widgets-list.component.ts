import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { showWidget } from 'src/app/animations';

@Component({
  selector: 'app-widgets-list',
  templateUrl: './widgets-list.component.html',
  styleUrls: ['./widgets-list.component.scss'],
  animations: [showWidget]
})
export class WidgetsListComponent implements OnInit {

  @Input() isSmallWidget: boolean;
  @Input() largeWidgets: Array<string>;
  @Input() smallWidgets: Array<string>;

  @Output() emitCloseList = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  chooseWidget() {
    let target = (<HTMLInputElement>event.target);
    let currentWidget = target.innerText;
    let widgetOnList: number;
    let emiter: any;
    if (this.isSmallWidget) {
      widgetOnList = this.smallWidgets.indexOf(currentWidget);
      emiter = [widgetOnList, "small"]
    } else {
      widgetOnList = this.largeWidgets.indexOf(currentWidget);
      emiter = [widgetOnList, "large"]
    }
    this.emitCloseList.emit(emiter);
  }
}
