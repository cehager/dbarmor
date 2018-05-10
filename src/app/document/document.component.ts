import {AfterViewInit, Component, OnInit} from '@angular/core';
import { AppRepositoryService} from '../services/apprepository.service';
import {forEach} from '@angular/router/src/utils/collection';
import {MessageService} from 'primeng/components/common/messageservice';
import {Message} from 'primeng/primeng';
import {FormControl} from '@angular/forms';
import {DataTable} from 'primeng/primeng';
import { Doc } from '../services/models/document';
declare var $: any;

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, AfterViewInit {

  docs: Doc[];
  doc: Doc;
  rowsSelected: Array<Doc>;
  editorContent: string;
  contentType: string;
  desc: string;
  docContents: string;
  //message: string;
  userId: string;
  lid: number;
  //logId: string;
  //currentDailyLog: any;

  lastRowSelected: any;
  apiPath: string;
  ed: any;
  edContentGet: string;
  delay: number;
  // rowSelected: any;
  constructor(public appRepository: AppRepositoryService, private messageSvc: MessageService) {  }

  options: Object = {
      key: 'WC7A5D4A4fG3A7A7C7A3B3C2G3C2F2ybeiB-11gdB-7A3c1jd==',
      charCounterCount: true,
      toolbarButtons: ['fontFamily', 'fontSize', 'color', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript',
          'superscript', 'align', 'outdent', 'indent', 'paragraphFormat',
         'insertHR', 'clearFormatting', 'undo', 'redo',  'emoticons', 'print', 'spellChecker',
          '|', 'alert', 'clear', 'save', 'archive', 'delete' ],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'strikeThrough',
          'fontSize', 'alert', 'paragraphFormat'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'strikeThrough',
          'fontSize', 'alert', 'paragraphFormat'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'strikeThrough',
          'fontSize', 'alert', 'paragraphFormat'],
      quickInsertButtons: ['image', 'table'],
      height: 328,
      fontSizeDefaultSelection: '14',
      placeholderText: 'PRIVATIZE your memories, start typing here...',
      saveInterval: 0,
      pastePlain: true,
      enter: $.FroalaEditor.ENTER_BR,
      codeBeautifierOptions: {
          end_with_newline: true,
          indent_inner_html: true,
          extra_liners: '["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "ul", "ol", "table", "dl"]',
          brace_style: 'expand',
          indent_char: ' ',
          indent_size: 4,
          wrap_line_length: 0
      }
  };


  onRowSelected(event) {
    this.editorContent = event.data.content;
    this.contentType = event.data.contentType;
    this.desc = event.data.desc;
    this.doc.Id = event.data.id;
    this.doc.documentId = event.data.documentId;
    this.doc.content = event.data.content;
    this.doc.contentType = event.data.contentType;
    this.doc.desc = event.data.desc;
    this.doc.relatedId = event.data.relatedId;
    this.doc.userId = event.data.userid;
    console.log('on row selected is: ', this.doc);
  }


ngOnInit() {
    this.doc.Id = 0;
    this.doc.documentId = '';
    this.doc.content = '';
    this.doc.contentType = '';
    this.doc.desc = '';
    this.doc.relatedId = '';
    this.doc.userId = '';

    $.FroalaEditor.DefineIcon('alert', {NAME: 'info'});
    $.FroalaEditor.RegisterCommand('alert', {
        title: 'Blackout',
        focus: false,
        undo: false,
        refreshAfterCallback: true,

        callback: function () {
            alert('This is a future feature that will cause highlighted text to be blacked out!');
        }
    });

    $.FroalaEditor.DefineIcon('clear', {NAME: 'ban'});
    $.FroalaEditor.RegisterCommand('clear', {
        title: 'Clear (remove all text)',
        focus: false,
        undo: true,
        refreshAfterCallback: true,
        callback: function () {
            this.html.set('');
            this.apprepository.isText = true;
            this.events.focus();
        }
    });

    $.FroalaEditor.DefineIcon('archive', {NAME: 'shield'});
    $.FroalaEditor.RegisterCommand('archive', {
        title: 'Save Local',
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function () {
            this.events.focus();
        }
    });


    $.FroalaEditor.DefineIcon('delete', {NAME: 'trash'});
    $.FroalaEditor.RegisterCommand('delete', {
        title: 'Delete',
        undo: true,
        refreshAfterCallback: true,
        callback: function () {
        }
    });

    // NOTE: needs to be moved to emailRespository.getFor("userid") & returns all encrypted emails.
    // this.appRepository.doGet()
    //     .subscribe((data: MessageDto[] ) => {
    //       this.appRepository.messages = data;
    //       this.messages = this.appRepository.messages;
    //
    //       // console.log('content of messages is: ', this.messages);
    //     }, (error) => { console.log('doGet failed', error); });

    this.edContentGet = 'html.get';
    this.ed = $('div#fred');

    this.appRepository.isText = true;
    // this.messageSvc.add({severity: 'success', summary: 'In-Box Messages', detail: 'Click on message to view in editor.'});
    // this.delay = 5000;
    // this.msgGrowls.push({severity: 'success', summary: 'In-Box Messages', detail: 'Click on message to view in editor.'});

    this.ed.on('froalaEditor.save.before', (e, editor) => {
        alert('Text has been encrypted and saved.');
    });

    // this.ed.clear();
    this.ed.on('froalaEditor.commands.before', (e, editor, cmd, param1, param2) => {
        console.log('command is: ', cmd);
        if (cmd === 'archive') {
            this.doEncrypt();
        }
    });

    // this.appRepository.doGet().subscribe( (data: MessageDto[]) => {
    //     this.appRepository.messages = data;
    //     this.messages = data; });

}

  ngAfterViewInit() {
      // this.apiPath = 'https://4226-25056.el-alt.com/dex/hypertext/l1/do';
        this.appRepository.doGet(this.appRepository.getApiBasePath() + 'docs/l1/getdocbyuserid/keep/'
        + this.appRepository.activeUserId) // updates the email inbox list
       //this.appRepository.doGet('https://4226-25056.el-alt.com/dex/hypertext/l1/getbyuserid/keep/'
         //     + this.appRepository.activeUserId) // updates the email inbox list
          .subscribe((data: Doc[] ) => {
              //this.appRepository.messages = data;
              this.docs = data; // this.appRepository.messages;
              console.log('ngAfterViewInit fired : ', this.docs);
          });

       // this.appRepository.doGet().subscribe( (data: MessageDto[]) => {
       //     this.appRepository.messages = data;
       //     this.messages = data; });
      // console.log('ngAfterViewInit fired : ', this.messages);
  }


  doEditCompleted(editInfo) {
    const fieldChanged = editInfo.column.field;
    const newRowValues = editInfo.data;
    console.log('field changed is: ', fieldChanged);
    console.log('row values are: ', newRowValues);
  }

  doEncrypt() {
      let rmsg = this.ed.froalaEditor(this.edContentGet);
      console.log('editor content is: ', rmsg);
      rmsg = rmsg.replace(/&nbsp;/gi, '');
      rmsg = rmsg.trim();
      if (rmsg.length === 0) {
          return;
      }

      this.apiPath = this.appRepository.getApiBasePath() + 'docs/l1/do';
      // if (this.ed.froalaEditor('charCounter.count') < 1) {
      //     this.editorContent = this.editorContent
      //         + '<br><br>Message must be at least 20 characters in length. This will go away with automatic padding.';
      //     return;
      // }
      //this.message = rmsg;

      //this.apiPath = 'http://localhost:5445/dex/dailylog/l1/do';
      //this.apiPath = 'https://4226-25056.el-alt.com/dex/dailylog/l1/do';
      console.log('apiPath is: ' + this.apiPath);
      console.log('rmsg is: ', rmsg);
      console.log('active user id is: ', this.appRepository.activeUserId);
      // this.currentDailyLog.userId = this.appRepository.activeUserId; //this.userId;
      // this.currentDailyLog.logDate = this.logDate;
      // this.currentDailyLog.message = rmsg;
      // this.currentDailyLog.summary = this.summary;
      // this.currentDailyLog.logId = this.appRepository.makeId(32); //this.logId;
      // console.log('current daily log is: ', this.currentDailyLog);

      this.appRepository.doEncryptDocument(this.doc, this.apiPath)
          .subscribe((data: Doc) => {
              this.editorContent = data.content; // updates secure editor
              this.appRepository.isText = false;

              //this.appRepository.messageDto.messageId = data.messageId;
             // this.ed.froalaEditor('edit.off');
          }, () => { this.editorContent = 'Not authorized to encrypt text, please login first.';  this.appRepository.isText = true; },
          () => {
              console.log('before do re-get userid is: ', this.userId);
              this.appRepository.doGet(this.appRepository.getApiBasePath() + 'docs/l1/getdocbyuserid/keep/'
              //this.appRepository.doGet('https://4226-25056.el-alt.com/dex/hypertext/l1/getbytouserid/keep/'
               + this.appRepository.activeUserId)  // updates the email inbox list
                  .subscribe((data: Doc[] ) => {
                      this.docs = data;
                      //this.messages = data; // this.appRepository.messages;
                      console.log('content of returned data is: ', data);
                      //console.log('touserid is: ', this.emailToUserId);

                  }, (error) => {
                      this.appRepository.messages = [];
                      this.docs = []; // this.appRepository.messages;
                      console.log('doGet failed', error);
                  });
          });
  }

  doDecrypt() {
      //this.apiPath = 'https://4226-25056.el-alt.com/dex/dailylog/l1/getbylogid/undo/';
      this.apiPath = this.appRepository.getApiBasePath() + 'docs/l1/getbydocid/undo/' + this.doc.documentId;
      console.log('row selected logid is: ', this.doc.documentId);
      // this.appRepository.doDecrypt(this.ed.froalaEditor(this.edContentGet), this.apiPath)
      this.appRepository.doDecryptDocument(this.doc, this.apiPath)
          .subscribe((data: Doc) => {
              //console.log('last row selected', this.lastRowSelected);
              console.log('DailyLog back from server is: ', data);
              this.editorContent = data.content; // updates the secure editor
              this.userId = data.userId;
              //this.logId = data.logId;
              //this.message = data.message;
              //this.summary = data.summary;
              //this.logDate = data.logDate;
              this.lid = data.Id;

              this.appRepository.isText = true;
          }, () => { this.editorContent = 'No longer available, previously decrypted';  this.appRepository.isText = false; },
              () => {
                  console.log('before do re-get userid is: ', this.userId);
                  this.appRepository.doGet(this.appRepository.getApiBasePath() + 'docs/l1/getdocbyuserid/keep/'
                   + this.userId)  // updates the email inbox list
                      .subscribe((data: Doc[] ) => {
                          this.docs = data;
                          //this.messages = data; // this.appRepository.messages;
                          console.log('content of returned data is: ', data);
                          //console.log('touserid is: ', this.emailToUserId);

                      }, (error) => {
                          this.appRepository.messages = [];
                          this.docs = []; // this.appRepository.messages;
                          console.log('doGet failed', error);
                      });
              });
  }

  // constructor(private appService: AppRepositoryService, private alertify: AlertifyService ) { }

  // ngOnInit() {
  //   this.getDocsByActiveUserId();
  // }

  // //activeUserId is automatically set in the apprepository
  // getDocsByActiveUserId() {
  //   this.appService.getDocuments().subscribe((dox: Doc[]) => {
  //     console.log('docs in doc component: ', dox);
  //     this.docs = dox;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

  // rowsSelected() {
  //   return true;
  // }

  // doEditCompleted(event) {
  //   return true;
  // }

  // onRowSelected(event) {
  //   return true;
  // }

}
