import { registerBlockType } from "@wordpress/blocks"
import { RichText, BlockControls } from "@wordpress/block-editor"
import { ToolbarGroup, ToolbarButton } from "@wordpress/components"

registerBlockType("ourblocktheme/genericheading", {
  title: "Generic Heading",
  attributes: {
    text: { type: "string" },
    size: { type: "string", default: "large" }
  },
  edit: EditComponent,
  save: SaveComponent
})

function EditComponent(props) {
  function handleTextchange(value) {
    props.setAttributes({ text: value })
  }
  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton isPressed={props.attributes.size === "large"} onClick={() => { props.setAttributes({ size: "large" }) }}>
            Large
          </ToolbarButton>
          <ToolbarButton isPressed={props.attributes.size === "medium"} onClick={() => { props.setAttributes({ size: "medium" }) }}>
            medium
          </ToolbarButton>
          <ToolbarButton isPressed={props.attributes.size === "small"} onClick={() => { props.setAttributes({ size: "small" }) }}>
            small
          </ToolbarButton>
        </ToolbarGroup>
      </BlockControls>
      <RichText
        allowedFormats={"core/bold"}
        className={`headline headline--${props.attributes.size}`}
        value={props.attributes.text}
        onChange={handleTextchange}
      />
    </>
  )
}

function SaveComponent(props) {
  function createTagName() {
    switch (props.attributes.size) {
      case "large":
        return "h1"
      case "medium":
        return "h3"
      case "small":
        return "h6"
    }
  }
  return <RichText.Content
    tagName={createTagName()}
    value={props.attributes.text}
    className={`headline headline--${props.attributes.size}`}
  />
}
