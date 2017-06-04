seajs.config({
	base  : "/dist/",
	alias : {
		jquery: "js/jquery-1.9.1.min",
		editormd: "editormd/editormd"
	}
});
var deps = [
	"jquery",
	"js/all.min",
	"ckeditor/ckeditor",
	"editormd/plugins/link-dialog/link-dialog",
	"editormd/plugins/reference-link-dialog/reference-link-dialog",
	"editormd/plugins/image-dialog/image-dialog",
	"editormd/plugins/code-block-dialog/code-block-dialog",
	"editormd/plugins/table-dialog/table-dialog",
	"editormd/plugins/emoji-dialog/emoji-dialog",
	"editormd/plugins/goto-line-dialog/goto-line-dialog",
	"editormd/plugins/help-dialog/help-dialog",
	"editormd/plugins/html-entities-dialog/html-entities-dialog", 
	"editormd/plugins/preformatted-text-dialog/preformatted-text-dialog",
	"editormd"
]
seajs.use(deps);