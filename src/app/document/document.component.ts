import {AfterViewInit, Component, OnInit} from '@angular/core';
import { AppRepositoryService} from '../services/apprepository.service';
import {forEach} from '@angular/router/src/utils/collection';
import {MessageService} from 'primeng/components/common/messageservice';
import {Message, MenuItem} from 'primeng/primeng';
import {FormControl} from '@angular/forms';
import {DataTable} from 'primeng/primeng';
import {SelectItem} from 'primeng/api';
import { Doc } from '../services/models/document';
import { AlertifyService } from '../services/alertify.service';
declare var $: any;

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, AfterViewInit {

  docs: Doc[];
  items: MenuItem[];
  doc: Doc;
  docType: SelectItem[];
  rowsSelected: Array<Doc>;
  editorContent: string;
  contentType: string;
  desc: string;
  docContents: string;
  //message: string;
  userId: string;
  Id: number;
  documentId: string;
  relatedId: string;
  lid: number;
  //logId: string;
  //currentDailyLog: any;
  currentDoc: any;
  lastRowSelected: any;
  apiPath: string;
  ed: any;
  edContentGet: string;
  delay: number;
  isMsgText: boolean;
  // rowSelected: any;
  constructor(public appRepository: AppRepositoryService, private messageSvc: MessageService, private alertify: AlertifyService) {  }

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
      placeholderText: 'PRIVATIZE your life\'s stories, start typing here...',
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
    this.Id = event.data.id;
    this.documentId = event.data.documentId;
    this.relatedId = event.data.relatedId;
    this.userId = event.data.userid;
    this.isMsgText = false;
    this.ed.froalaEditor('edit.off');
    console.log('row selected values are: ', event.data);
  }


ngOnInit() {
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
            //this.apprepository.isText = true;
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

   // this.appRepository.isText = true;
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

    this.items = [
        {label: 'Create New Document/Story', icon: 'fa-refresh', command: () => {
            this.doCreateNewDoc();
            this.isMsgText = true;
            this.ed.froalaEditor('edit.on');
            //this.alertify.message('Create New Message');
        }},
        {label: 'Archive', icon: 'fa-close', command: () => {
            this.alertify.message('Archive');
            this.ed.froalaEditor('edit.on');
            this.isMsgText = true;
        }},
        {label: 'Save Local', icon: 'fa-close', command: () => {
            this.alertify.message('Save Local');
            this.isMsgText = true;
            this.ed.froalaEditor('edit.on');
        }},
        {label: 'Delete', icon: 'fa-close', command: () => {
            this.alertify.message('delete');
            this.isMsgText = true;
            this.ed.froalaEditor('edit.on');
        }}
        ];

        this.isMsgText = true;
        this.currentDoc = new Object();
        this.doLoadDocTypes();


        this.ed.on('froalaEditor.commands.after', (e, editor, cmd, param1, param2) => {
            //console.log('command is: ', cmd);
            if (cmd === 'save') {
                this.doEncrypt();
                //this.alertify.success('Message has been saved!');
              //   this.emailTo = '';
              //   this.emailSubject = '';
              //   this.editorContent = '';
            }
            if (cmd === 'clear') {
                this.isMsgText = true;
                this.ed.froalaEditor('edit.on');
            }
        });
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

  doCreateNewDoc() {
    this.editorContent = '';
    this.contentType = '';
    this.desc = '';
    this.documentId = '';
    this.relatedId = '';
    this.Id = 0;
    this.isMsgText = true;
    this.ed.froalaEditor('edit.on');
}


  doEditCompleted(editInfo) {
    const fieldChanged = editInfo.column.field;
    const newRowValues = editInfo.data;
    console.log('field changed is: ', fieldChanged);
    console.log('row values are: ', newRowValues);
  }

  doLoadDocTypes() {
      this.docType = [];
      this.docType.push({label: 'Short Story', value: 'Short Story'});
      this.docType.push({label: 'Story', value: 'Story'});
      this.docType.push({label: 'Autobiography', value: 'Autobiography'});
      this.docType.push({label: 'Biography', value: 'Biography'});
      this.docType.push({label: 'Novel', value: 'Novel'});
      this.docType.push({label: 'Fiction', value: 'Fiction'});
      this.docType.push({label: 'Legal Doc', value: 'Legal Doc'});
      this.docType.push({label: 'Blog', value: 'Blog'});
      this.docType.push({label: 'Other', value: 'Other'});
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
      //this.currentDoc = new Object();
      this.currentDoc.content = rmsg;
      this.currentDoc.contentType = this.contentType;
      this.currentDoc.desc = this.desc;
      this.currentDoc.userId = this.appRepository.activeUserId;
      this.currentDoc.documentId = this.appRepository.makeId(20);
      this.currentDoc.relatedId = 'none';
      this.currentDoc.Id = 0;
      //this.documentId = this.currentDoc.documentId;

      this.appRepository.doEncryptDocument(this.currentDoc, this.apiPath)
          .subscribe((data: Doc) => {
              this.editorContent = data.content; // updates secure editor
              this.contentType = data.contentType;
              this.desc = data.desc;
              this.userId = data.userId;
              this.documentId = data.documentId;
              this.relatedId = data.relatedId;
              this.Id = data.Id;
              //this.appRepository.isText = false;
                this.isMsgText = false;
                this.ed.froalaEditor('edit.off');

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
                      this.isMsgText = true;
                      this.ed.froalaEditor('edit.on');
                  });
          });
  }

  doDecrypt() {
      //this.apiPath = 'https://4226-25056.el-alt.com/dex/dailylog/l1/getbylogid/undo/';
      console.log('row selected documentId is: ', this.documentId);
      this.apiPath = this.appRepository.getApiBasePath() + 'docs/l1/getbydocid/undo/' + this.documentId;

      //this.currentDoc = new Object();
      this.currentDoc.content = this.editorContent;
      this.currentDoc.userId = this.appRepository.activeUserId;
      this.currentDoc.contentType = this.contentType;
      this.currentDoc.documentId = this.documentId;
      this.currentDoc.desc = this.desc;
      this.currentDoc.Id = this.Id;
      this.currentDoc.relatedId = this.relatedId;
      console.log('Document before being decrypted is: ', this.currentDoc);
      // this.appRepository.doDecrypt(this.ed.froalaEditor(this.edContentGet), this.apiPath)
      this.appRepository.doDecryptDocument(this.currentDoc, this.apiPath)
          .subscribe((data: Doc) => {
              //console.log('last row selected', this.lastRowSelected);
              console.log('Document back from server is: ', data);
              this.editorContent = data.content; // updates the secure editor
              this.userId = data.userId;
              this.contentType = data.contentType;
              this.documentId = '';   //data.documentId;
              this.desc = data.desc;
              this.Id = data.Id;
              this.relatedId = data.relatedId;

              //this.logId = data.logId;
              //this.message = data.message;
              //this.summary = data.summary;
              //this.logDate = data.logDate;
              this.lid = data.Id;
              this.isMsgText = true;
              this.ed.froalaEditor('edit.on');
              //this.appRepository.isText = true;
          }, () => { this.editorContent = 'No longer available, previously decrypted';  this.appRepository.isText = false; },
              () => {
                  console.log('before do re-get userid is: ', this.userId);
                  this.appRepository.doGet(this.appRepository.getApiBasePath() + 'docs/l1/getdocbyuserid/keep/'
                   + this.userId)  // updates the email inbox list
                      .subscribe((data: Doc[] ) => {
                          this.docs = data;
                          this.isMsgText = true;
                          this.ed.froalaEditor('edit.on');
                          //this.messages = data; // this.appRepository.messages;
                          console.log('content for list from server is: ', data);
                          //console.log('touserid is: ', this.emailToUserId);

                      }, (error) => {
                          this.appRepository.messages = [];
                          this.docs = []; // this.appRepository.messages;
                          console.log('doGet failed', error);
                          this.isMsgText = true;
                          this.ed.froalaEditor('edit.on');

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
