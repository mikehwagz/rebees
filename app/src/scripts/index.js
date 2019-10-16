import app from '@/app'

// Components mounted via 'data-ui' are not unmounted/mounted during page
// transitions. Used for persistent UI like navigation and webgl.
app.mount(['data-ui', 'data-component'])
