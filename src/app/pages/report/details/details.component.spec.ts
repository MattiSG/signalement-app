import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule, defineLocale, frLocale } from 'ngx-bootstrap';
import { FileInputComponent } from '../../../components/file-input/file-input.component';
import { Report, ReportDetails } from '../../../model/Report';
import { Precision, Subcategory, SubcategoryDetails } from '../../../model/Anomaly';
import { CollapsableTextComponent } from '../../../components/collapsable-text/collapsable-text.component';
import { Angulartics2RouterlessModule } from 'angulartics2/routerlessmodule';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReportService, Step } from '../../../services/report.service';
import { of } from 'rxjs';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

describe('DetailsComponent', () => {

  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let reportService: ReportService;

  const anomalyDateFixture = new Date(2018, 1, 2);
  const anomalyFileFixture = new File([], 'anomaly.jpg');
  const reportDetailsFixture = new ReportDetails();
  reportDetailsFixture.description = 'Description';
  reportDetailsFixture.anomalyDate = anomalyDateFixture;
  reportDetailsFixture.anomalyTimeSlot = 5;
  reportDetailsFixture.ticketFile = undefined;
  reportDetailsFixture.anomalyFile = anomalyFileFixture;

  beforeEach(async(() => {
    defineLocale('fr', frLocale);
    TestBed.configureTestingModule({
      declarations: [
        DetailsComponent,
        BreadcrumbComponent,
        FileInputComponent,
        CollapsableTextComponent,
        TruncatePipe,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        BsDatepickerModule.forRoot(),
        Angulartics2RouterlessModule.forRoot(),
      ],
      providers: [
        ReportService,
      ]
    })
      .overrideTemplate(BreadcrumbComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    reportService = TestBed.get(ReportService);
    reportService.currentReport = of(new Report());

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit function', () => {

    it('should initially display the form and no errors message', () => {
      const nativeElement = fixture.nativeElement;
      expect(nativeElement.querySelector('form')).not.toBeNull();
      expect(nativeElement.querySelector('.notification.error')).toBeNull();
    });

    it('should initialize the details inputs with empty values and current date when there is no initial value', () => {
      const nativeElement = fixture.nativeElement;
      expect(nativeElement.querySelector('textarea[formControlName="description"]').value).toEqual('');
      expect(nativeElement.querySelector('input[formControlName="anomalyDate"]').value).toEqual((new Date()).toLocaleDateString('fr'));
      expect(nativeElement.querySelector('select').value).toEqual('');
    });

    it('should initialize the details inputs with initial value when it exists', () => {
      const reportWithDetails = new Report();
      reportWithDetails.details = reportDetailsFixture;
      reportService.currentReport = of(reportWithDetails);

      component.ngOnInit();
      fixture.detectChanges();

      const nativeElement = fixture.nativeElement;
      expect(nativeElement.querySelector('textarea[formControlName="description"]').value).toEqual(reportDetailsFixture.description);
      expect(nativeElement.querySelector('input[formControlName="anomalyDate"]').value)
        .toEqual(reportDetailsFixture.anomalyDate.toLocaleDateString('fr'));
      expect(nativeElement.querySelector('select').value).toEqual(reportDetailsFixture.anomalyTimeSlot.toString());
    });

    it ('should define the plageHoraireList to display', () => {
      expect(component.plageHoraireList).toBeDefined();
      expect(component.plageHoraireList.length).toBe(24);
    });

    it('sould display radio inputs to select precision when a precision list is attached to the subcategory and mutiple selection are not allowed', () => {
      const reportWithSubcategory = new Report();
      reportWithSubcategory.subcategory = new Subcategory();
      const precision = new Precision();
      precision.title = 'titre precision';
      precision.options = [ {title: 'option 1'}, { title: 'option 2'}];
      const subcategoryDetails = new SubcategoryDetails();
      subcategoryDetails.precision = precision;
      reportWithSubcategory.subcategory.details = subcategoryDetails;
      reportService.currentReport = of(reportWithSubcategory);

      component.ngOnInit();
      fixture.detectChanges();

      const nativeElement = fixture.nativeElement;
      expect(component.singlePrecisionCtrl).toBeDefined();
      expect(component.multiplePrecisionCtrl).toBeUndefined();
      expect(nativeElement.querySelectorAll('input[formControlName="singlePrecision"]').length).toEqual(precision.options.length);
    });

    it('sould display checkbox inputs to select precisions when a precision list is attached to the subcategory and mutiple selection are allowed', () => {
      const reportWithSubcategory = new Report();
      reportWithSubcategory.subcategory = new Subcategory();
      const precision = new Precision();
      precision.title = 'titre precision';
      precision.severalOptionsAllowed = true;
      precision.options = [ {title: 'option 1'}, { title: 'option 2'}];
      const subcategoryDetails = new SubcategoryDetails();
      subcategoryDetails.precision = precision;
      reportWithSubcategory.subcategory.details = subcategoryDetails;
      reportService.currentReport = of(reportWithSubcategory);

      component.ngOnInit();
      fixture.detectChanges();

      const nativeElement = fixture.nativeElement;
      expect(component.singlePrecisionCtrl).toBeUndefined();
      expect(component.multiplePrecisionCtrl).toBeDefined();
      expect(nativeElement.querySelectorAll('input[type="checkbox"]').length).toEqual(precision.options.length);
    });

  });

  describe('submitDetailsForm function', () => {

    it('should display errors when occurs', () => {
      component.anomalyDateCtrl.setValue('');

      component.submitDetailsForm();
      fixture.detectChanges();

      const nativeElement = fixture.nativeElement;
      expect(component.showErrors).toBeTruthy();
      expect(nativeElement.querySelector('.notification.error')).not.toBeNull();
    });

    it ('should emit and event with a company which contains form inputs when no errors', () => {
      const reportWithSubcategory = new Report();
      reportWithSubcategory.subcategory = new Subcategory();
      const precision = new Precision();
      precision.title = 'titre precision';
      precision.options = [ {title: 'option 1'}, { title: 'option 2'}];
      const subcategoryDetails = new SubcategoryDetails();
      subcategoryDetails.precision = precision;
      reportWithSubcategory.subcategory.details = subcategoryDetails;
      reportService.currentReport = of(reportWithSubcategory);
      component.ngOnInit();
      component.descriptionCtrl.setValue('Description');
      component.singlePrecisionCtrl.setValue('precision');
      component.anomalyDateCtrl.setValue(anomalyDateFixture);
      component.anomalyTimeSlotCtrl.setValue(5);
      component.anomalyFile = anomalyFileFixture;
      const changeReportSpy = spyOn(reportService, 'changeReport');

      const nativeElement = fixture.nativeElement;
      nativeElement.querySelector('button[type="submit"]').click();
      fixture.detectChanges();

      const detailsExpected = new ReportDetails();
      detailsExpected.description = 'Description';
      detailsExpected.precision = 'precision';
      detailsExpected.anomalyDate = anomalyDateFixture;
      detailsExpected.anomalyTimeSlot = 5;
      detailsExpected.ticketFile = undefined;
      detailsExpected.anomalyFile = anomalyFileFixture;
      const reportExpected = new Report();
      reportExpected.subcategory = new Subcategory();
      reportExpected.subcategory.details = subcategoryDetails;
      reportExpected.details = detailsExpected;

      expect(changeReportSpy).toHaveBeenCalledWith(reportExpected, Step.Details);
    });
  });
});
