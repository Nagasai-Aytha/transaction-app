import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TransactionFormComponent } from './transaction-form.component';

describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionFormComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Disable submit button onload', () => {
    const fixture = TestBed.createComponent(TransactionFormComponent);
    fixture.detectChanges();
    const submitEl = fixture.debugElement.nativeElement;
    console.log(submitEl)
    expect(submitEl.querySelector('#from').disabled).toBeTruthy();
  });
});
