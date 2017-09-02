const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ETP = require('extract-text-webpack-plugin');


module.exports = {
    'context': __dirname + '/src',
    'entry': './js/app.ts',
    'output': {
        'path': __dirname + '/build',
        'filename': 'app.js'
    },
    'module': {
        'rules': [
            {//реалізується правило для tslint
                'enforce': 'pre',
                'test': /\.tsx?$/,
                'loader': 'tslint-loader',
                'options': {
                    'configuration': {//для прикладу, що webpack відпрацьовує на цьому правилі
                        'rules': {
                            'quotemark': [true, 'double']
                        }
                    }, 
                    'fileOutput': {                        
                       'dir':  './report',                       
                       'ext': 'xml',                       
                        'header': '<?xml version="1.0" encoding="utf-8"?>\n<checkstyle version="5.7">', 
                        'footer': '</checkstyle>'
                    }
                }
            },
            {//реалізується правило для конвертації ts в js
                'test': /\.tsx?$/,
                'loader': 'ts-loader'
            },
            {//реалізується правило для конвертації scss в css
                test: /main\.scss/,                
                loader: ETP.extract('css-loader!resolve-url-loader!sass-loader?sourceMap')
            },
        ]
    },
    'plugins': [
        new StyleLintPlugin({//реалізується правило для scsslint
            configFile: './stylelint.config.js'
        }),
        new ETP('styles.css',{allChunks: true}) //плагін, що виноситиме стилі в окремий файл
    ],
    'devtool': 'source-map'
}