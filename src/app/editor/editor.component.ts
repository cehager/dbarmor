import {Component, OnInit} from '@angular/core';
import { AppRepositoryService, MessageDto } from '../services/apprepository.service';
declare var $: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  editorContent = '';
  editor: any;
  ed: any;
  message: string;
  edContentGet: string;
  apiPath: string;

  // messageDto: MessageDto = {
  //     message: '',
  //     createdOn: '11/27/2017',
  //     deleteAfter: '12/27/2017'
  // };

  constructor(public appRepository: AppRepositoryService) { }

  options: Object = {
      charCounterCount: true,
      toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough',
          'fontSize', 'alert', 'paragraphFormat'],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'strikeThrough',
          'fontSize', 'alert', 'paragraphFormat'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'strikeThrough',
          'fontSize', 'alert', 'paragraphFormat'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'strikeThrough',
          'fontSize', 'alert', 'paragraphFormat'],
      quickInsertButtons: ['image', 'table'],
      height: 328,
      fontSizeDefaultSelection: '14',
      placeholderText: 'Start typing here...',
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

  ngOnInit() {
      // console.log('in onInit' );
      $.FroalaEditor.DefineIcon('alert', {NAME: 'info'});
      $.FroalaEditor.RegisterCommand('alert', {
          title: 'Blackout',
          focus: false,
          undo: false,
          refreshAfterCallback: false,

          callback: function () {
              alert('This is a future feature that will cause highlighted text to be blacked out!');
          }
      });

      this.edContentGet = 'html.get';
      this.ed = $('div#fred');
      this.editorContent = this.appRepository.reloadEditorContent();

      if (this.appRepository.isEdBufferEmpty()) {
          this.appRepository.isText = true;
      }

      // this.isText = this.appRepository.isText;
      // this.appRepository.reloadEditorContent();
      // this.setFocusEvent();
      this.setCounterUpdateEvent();
      this.doAfterPaste();
  }



  setCounterUpdateEvent() {
      this.ed.on('froalaEditor.charCounter.update', (e, editor) => {
        if (this.ed.froalaEditor('core.isEmpty')) {
            console.log('is editor empty: ', this.appRepository.isText);
            this.appRepository.isText = true;
        }
      });
  }

  // setFocusEvent() {
  //     this.ed.on('froalaEditor.focus', (e, editor) => {
  //         this.isText = !this.isText;
  //         console.log('editor is here: ', editor);
  //     });
  // }

  // doBeforePaste() {
  //     this.ed.on('froalaEditor.paste.before', (e, editor, original_event) => {
  //         this.appRepository.isText = !this.appRepository.doIOF(clipboard_html);
  //         this.appRepository.reloadEditorContent();
  //
  //     });
  // }

  doAfterPaste() {
      this.ed.on('froalaEditor.paste.afterCleanup', (e, editor, clipboard_html) => {
        this.appRepository.isText = !this.appRepository.doIOF(clipboard_html);
        this.appRepository.reloadEditorContent();
      });
  }

  doEncrypt() {
      let rmsg = this.ed.froalaEditor(this.edContentGet);
      rmsg = rmsg.replace(/&nbsp;/gi, '');
      rmsg = rmsg.trim();
      if (this.ed.froalaEditor('charCounter.count') < 20) {
          this.editorContent = this.editorContent
              + '<br><br>Message must be at least 20 characters in length.';
          return;
      }

      // this.apiPath = 'http://localhost:5445/dex/hypertext/l1/trialdo';
      this.apiPath = 'https://4226-25056.el-alt.com/dex/hypertext/l1/trialdo';
      this.appRepository.doEncrypt(rmsg, this.apiPath)
          .subscribe((data: MessageDto) => {
              this.editorContent = data.message;
              this.appRepository.messageDto.messageId = data.messageId;
              this.appRepository.isText = false;
          }, () => { this.editorContent = 'Error encrypting text';  this.appRepository.isText = true; });
  }

  doDecrypt() {
      // this.apiPath = 'http://localhost:5445/dex/hypertext/l1/gettrialbymsgid/undo/';
      this.apiPath = 'https://4226-25056.el-alt.com/dex/hypertext/l1/gettrialbymsgid/undo/';
      // this.appRepository.doDecrypt(this.ed.froalaEditor(this.edContentGet), this.apiPath)
      this.appRepository.doDecrypt(this.appRepository.messageDto.messageId, this.apiPath)
          .subscribe((data: MessageDto) => {
              this.editorContent = data.message;
              this.appRepository.isText = true;
          }, () => { this.editorContent = 'No longer available, previously decrypted';  this.appRepository.isText = false; });
  }

  onClick() {
     alert('button has been clicked!');
  }

}
