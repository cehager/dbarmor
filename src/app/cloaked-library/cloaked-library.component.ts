import {AfterViewInit, Component, OnInit} from '@angular/core';
import { AppRepositoryService} from '../services/apprepository.service';
import { AlertifyService } from '../services/alertify.service';
import * as moment from 'moment';
import { CText } from '../services/models/ctxt'; //interface def

declare var $: any;


@Component({
  selector: 'app-cloaked-library',
  templateUrl: './cloaked-library.component.html',
  styleUrls: ['./cloaked-library.component.scss']
})
export class CloakedLibraryComponent implements OnInit, AfterViewInit {
  libItems: CText[];
  rowsSelected: Array<CText>;
  editorContent: string;
  csubject: string;
  userId: string;
  textId: string;
  currentLibItem: CText;
  apiPath: string;
  ed: any;
  edContentGet: string;
  delay: number;
  isMsgText: boolean;
  dialogVisible: boolean;

  constructor(public appRepository: AppRepositoryService, private alertify: AlertifyService) {  }

  options: Object = {
      key: 'WC7A5D4A4fG3A7A7C7A3B3C2G3C2F2ybeiB-11gdB-7A3c1jd==',
      charCounterCount: true,
      toolbarButtons: ['fontFamily', 'fontSize', 'color', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript',
          'superscript', 'align', 'outdent', 'indent', 'paragraphFormat',
         'insertHR', 'clearFormatting', 'undo', 'redo',  'emoticons', 'print', 'spellChecker',
          '|', 'alert', 'clear', 'save', 'archive', 'delete' ],
      toolbarButtonsXS: [],
    //   toolbarButtonsXS: ['bold', 'italic', 'underline', 'strikeThrough',
    //       'fontSize', 'alert', 'paragraphFormat'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'strikeThrough',
          'fontSize', 'alert', 'paragraphFormat'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'strikeThrough',
          'fontSize', 'alert', 'paragraphFormat'],
      quickInsertButtons: ['image', 'table'],
      height: 328,
      fontSizeDefaultSelection: '14',
      placeholderText: 'PRIVATIZE your day, start typing here...',
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
      this.currentLibItem.cSubject = event.data.cSubject;
      this.currentLibItem.userId = event.data.userId;
      this.currentLibItem.txtId = event.data.txtId;
      this.currentLibItem.cText = event.data.cText;
      this.editorContent = event.data.cText;
      this.csubject = event.data.cSubject;
      //this.ed.froalaEditor('edit.off');
      //console.log('on row selected is: ', this.currentDailyLog);
  }


ngOnInit() {
    this.currentLibItem = {
      Id: 0,
      txtId: '',
      userId: '',
      cSubject: '',
      cText: ''
    };

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

    this.edContentGet = 'html.get';
    this.ed = $('div#fred');

    this.ed.on('froalaEditor.save.before', (e, editor) => {
        alert('Text has been encrypted and saved.');
    });

    this.ed.on('froalaEditor.commands.before', (e, editor, cmd) => {
        console.log('command is: ', cmd);
        if (cmd === 'archive') {
            this.doPost();
        }
    });


      this.ed.on('froalaEditor.commands.after', (e, editor, cmd, param1, param2) => {
          //console.log('command is: ', cmd);
          if (cmd === 'save') {
              this.doPost();
              //this.alertify.success('Message has been saved!');
          }
      });

      this.ed.on('froalaEditor.commands.after', (e, editor, cmd, param1, param2) => {
          console.log('command is: ', cmd);
          if (cmd === 'clear') {
              this.isMsgText = true;
          }
      });

      //this.ed.froalaEditor('edit.on');
}

  ngAfterViewInit() {
        this.appRepository.doGetCtxtByUserId() // updates the list
          .subscribe((data: CText[] ) => {
              //console.log('get libitems is: ', data);
              this.libItems = data;
              }
          );
  }

  addNew() {
    this.doCreateNewMsg();
  }

  deleteMsg() {
    this.dialogVisible = true;
  }

  btnDelete() {
    this.dialogVisible = false;
    // this.appRepository.deleteMsg(this.currentLibItem).subscribe((data) => {
    //    this.ngAfterViewInit();
    // });
    this.doCreateNewMsg();
  }

  btnCancel() {
    this.dialogVisible = false;
    //this.doCreateNewLogEntry();
  }


  doCreateNewMsg() {
      this.editorContent = '';
      this.currentLibItem.cSubject = '';
      this.currentLibItem.cText = '';
      //this.ed.froalaEditor('edit.on');
  }

  doPost() {
      let rmsg = this.ed.froalaEditor(this.edContentGet);
      //console.log('editor content is: ', rmsg);
      rmsg = rmsg.replace(/&nbsp;/gi, '');
      rmsg = rmsg.trim();
      if (rmsg.length === 0) {
          //console.log('editor content is: ', rmsg);
          this.alertify.dialog('Got It!', '<h3>There is nothing to encrypt!<h3>');
          return;
      }

      this.apiPath = this.appRepository.getApiBasePath() + 'ctxt/l1/do';

      // console.log('apiPath is: ' + this.apiPath);
      // console.log('rmsg is: ', rmsg);
      // console.log('active user id is: ', this.appRepository.activeUserId);
      this.currentLibItem.userId = this.appRepository.activeUserId; //this.userId;
      this.currentLibItem.cText = rmsg;
      this.currentLibItem.cSubject = this.csubject;
      //this.currentLibItem.txtId = this.appRepository.makeId(32); //this.logId;
      console.log('current daily log is: ', this.currentLibItem);

      this.appRepository.doPostCtxt(this.currentLibItem, this.apiPath)
          .subscribe((data: CText) => {
              this.editorContent = data.cText; // updates secure editor
              this.isMsgText = false;
             //this.ed.froalaEditor('edit.off');
          }, () => { this.editorContent = 'Not authorized to encrypt text, please login first.';  this.isMsgText = true; },
          () => {
              console.log('before do re-get userid is: ', this.userId);
              this.appRepository.doGet(this.appRepository.getApiBasePath() + 'ctxt/l1/getbyuserid/keep/'
               + this.appRepository.activeUserId)  // updates the email inbox list
                  .subscribe((data: CText[] ) => {
                      this.libItems = data;
                      //this.messages = data; // this.appRepository.messages;
                      console.log('content of ctext data is: ', data);
                      //console.log('touserid is: ', this.emailToUserId);

                  }, (error) => {
                      this.appRepository.messages = [];
                      this.libItems = []; // this.appRepository.messages;
                      console.log('doGet failed', error);
                  });
          });
  }

  doGetCTxt() {
      //this.apiPath = 'https://4226-25056.el-alt.com/dex/dailylog/l1/getbylogid/undo/';
      this.apiPath = this.appRepository.getApiBasePath() + 'ctxt/l1/getbytxtid/undo/' + this.currentLibItem.txtId;
      console.log('row selected logid is: ', this.currentLibItem.txtId);
      // this.appRepository.doDecrypt(this.ed.froalaEditor(this.edContentGet), this.apiPath)
      this.appRepository.doGetCText(this.currentLibItem.txtId, this.apiPath)
          .subscribe((data: CText) => {
              this.editorContent = data.cText; // updates the secure editor
              //this.ed.froalaEditor('edit.on');
              this.userId = data.userId;
              this.textId = data.txtId;
              this.csubject = data.cSubject;
          }, () => { this.editorContent = 'Cannot locate library item'; });
  }

  doCancel() {
    this.editorContent = '';
  }
}
