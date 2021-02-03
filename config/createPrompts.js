/** * * * * * * * * * * * * * * * * * * * *
 * Extension-CLI
 * Command line build tool for building
 * browser extensions
 *
 * Author: Mobile First LLC
 * Website: https://mobilefirst.me
 *
 * @description
 * This module specifies xt-create command
 * prompts that guide user through creating
 * a new extension project.
 * * * * * * * * * * * * * * * * * * * * */

const texts = require('../config/texts').xtCreate;

exports.prompts = {
    name: {
        type: 'text',
        name: 'name',
        message: texts.promptName,
        validate: value =>
            // basic null check is sufficient
            !value || value.trim().length < 1 ?
                texts.promptNameError : true
    },
    optional: [
        {
            type: 'text',
            name: 'description',
            message: texts.prompDescription
        }, {
            type: 'text',
            name: 'homepage',
            message: texts.promptHomepage
        }
    ]
};
