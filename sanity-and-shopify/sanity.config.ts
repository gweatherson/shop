import {defineConfig, isDev} from 'sanity'

import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {imageHotspotArrayPlugin} from 'sanity-plugin-hotspot-array'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import {customDocumentActions} from './plugins/customDocumentActions'
import Navbar from './components/studio/Navbar'

import {linkField} from 'sanity-plugin-link-field'

import { presentationTool } from "sanity/presentation";

const devOnlyPlugins = [visionTool()]

export default defineConfig({
  name: 'default',
  title: 'Sanity and Shopify',

  projectId: 'ub1aike9',
  dataset: 'production',

  plugins: [
    linkField({
      linkableSchemaTypes: ['page', 'product'],
    }),
    presentationTool({
      previewUrl: {
        origin: "http://localhost:3000",
        preview: "/",
        previewMode: {
          enable: "/resource/preview",
        },
      },
    }),
    structureTool({structure}),
    colorInput(),
    imageHotspotArrayPlugin(),
    customDocumentActions(),
    media(),
    ...(isDev ? devOnlyPlugins : []),
  ],

  schema: {
    types: schemaTypes,
  },

  form: {
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource)
      },
    },
  },

  studio: {
    components: {
      navbar: Navbar,
    },
  },
})