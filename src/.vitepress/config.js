const getBase = require('shuttle-theme/config')
const path = require('path')

const events = [
    {
        text: 'Events',
        items: [
            {
                text: 'Overview',
                link: '/events/overview'
            },
        ]
    },
    {
        text: 'Implementations',
        items: [
            {
                text: 'SQL',
                link: '/events/sql'
            },
        ]
    },
];

const projections = [
    {
        text: 'Projections',
        items: [
            {
                text: 'Overview',
                link: '/projections/overview'
            },
        ]
    },
    {
        text: 'Implementations',
        items: [
            {
                text: 'SQL',
                link: '/projections/sql'
            },
        ]
    },
];

module.exports = (async () => {
    const base = await getBase({ base: '/shuttle-recall' });

    return {
        ...base,

        vite: {
            ...base.vite,
            build: {
                minify: false
            },
        },

        base: '/shuttle-recall/',
        lang: 'en-US',
        title: 'Shuttle.Recall',
        description: 'Shuttle.Recall Documentation',

        head: [
            ...base.head,
            ['link', { rel: "shortcut icon", href: "/shuttle-recall/favicon.ico" }]
        ],

        themeConfig: {
            // algolia: {
            //     indexName: 'shuttle-recall',
            //     appId: 'VM33RJ87BH',
            //     apiKey: 'fc560606a3c14b173d0ddf57a3258c84'
            // },

            // carbonAds: {
            //     code: '',
            //     placement: ''
            // },

            socialLinks: [
                { icon: 'github', link: 'https://github.com/Shuttle/shuttle-recall' },
                { icon: 'discord', link: 'https://discord.gg/Fjg5mZP9ey' }
                // { icon: 'twitter', link: '' },
            ],

            footer: {
                copyright: `Copyright © 2013-${new Date().getFullYear()} Eben Roux`
            },
            
            nav: [
                {
                    text: 'Getting started',
                    activeMatch: `^/getting-started`,
                    link: '/getting-started'
                },
                {
                    text: 'Events',
                    activeMatch: `^/events/`,
                    link: '/events/overview'
                },
                {
                    text: 'Projections',
                    activeMatch: `^/projections/`,
                    link: '/projections/overview'
                },
            ],

            sidebar: {
                '/events/': events,
                '/projections/': projections,
            }
        },
    };
})()
