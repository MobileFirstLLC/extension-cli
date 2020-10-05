exports.questions = [
    {
        type: 'text',
        name: 'name',
        message: 'What do you want to call the extension?',
        validate: value => !value || value.trim().length < 2 ? 'You must choose a name' : true
    },
    {
        type: 'text',
        name: 'description',
        message: 'What does it do?',
    },
    {
        type: 'text',
        name: 'homepage',
        message: 'Homepage URL (leave blank if you do not have one yet)',
    }
];
