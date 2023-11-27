import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
import { Button, PanelBody, PanelRow } from "@wordpress/components"
import { registerBlockType } from "@wordpress/blocks"
import { useEffect } from "@wordpress/element"
import apiFetch from "@wordpress/api-fetch"


registerBlockType("ourblocktheme/banner", {
  title: "Banner",
  supports: {
    align: ["full"]
  },
  attributes: {
    align: { type: "string", default: "full" },
    imgID: { type: "number" },
    imgURL: { type: "string", default: banner.fallbackimage }
  },
  edit: EditComponent,
  save: SaveComponent
})

function EditComponent(props) {
  // const useMeLater = (
  //   <>
  //     <h1 className="headline headline--large">Welcome!</h1>
  //     <h2 className="headline headline--medium">We think you&rsquo;ll like it here.</h2>
  //     <h3 className="headline headline--small">
  //       Why don&rsquo;t you check out the <strong>major</strong> you&rsquo;re interested in?
  //     </h3>
  //     <a href="#" className="btn btn--large btn--blue">
  //       Find Your Major
  //     </a>
  //   </>
  // )
  function onFileSelect(data) {
    props.setAttributes({ imgID: data.id })
  }

  useEffect(
    function () {
      if (props.attributes.imgID) {
        async function go() {
          const response = await apiFetch({
            path: `/wp/v2/media/${props.attributes.imgID}`,
            method: "GET"
          })
          props.setAttributes({ imgURL: response.media_details.sizes.pageBanner.source_url })
        }
        go()
      }
    },
    [props.attributes.imgID]
  )

  return (
    <>
      <InspectorControls>
        <PanelBody title="Background" initialOpen={true}>
          <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={onFileSelect}
                value={props.attributes.imgID}
                render={({ open }) => {
                  return <Button onClick={open}>Choose Image</Button>
                }}
              />
            </MediaUploadCheck>
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div className="page-banner">
        <div className="page-banner__bg-image" style={{ backgroundImage: `url('${props.attributes.imgURL}')` }}></div>
        <div className="page-banner__content container t-center c-white">
          <InnerBlocks allowedBlocks={[ "ourblocktheme/genericheading", "ourblocktheme/genericbutton"]} />
        </div>
      </div>
    </>

  )
}

function SaveComponent() {
  return <InnerBlocks.Content />
}
