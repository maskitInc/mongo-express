'use strict';
window.ME_SETTINGS = {
    readOnly: '{{ !!settings.read_only }}' === 'true',
    codeMirrorEditorTheme: '{{ editorTheme }}',
    baseHref: '{{ baseHref }}',
    collapsibleJSON: '{{ !!collapsibleJSON }}' === 'true',
    collapsibleJSONDefaultUnfold: parseInt('{{ collapsibleJSONDefaultUnfold || 0}}', 10),
    dbName: '{{ dbName }}',
    collectionName: '{{ collectionName | url_encode }}',
    bucketName: '{{ bucketName }}'
};