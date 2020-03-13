/**
 * BLOCK: staff-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, PlainText, MediaUpload, MediaUploadCheck } = wp.blockEditor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'sr-plugin/staff-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Staff' ), // Block title.
	icon: 'smiley', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'staff' ),
		__( 'teacher' ),
		__( 'coach' ),
	],
	attributes: {
		name: {
			type: 'string',
			source: 'test',
			selector: '.name',
		},
		position: {
			type: 'string',
			source: 'text',
			selector: '.position',
		},
		bio: {
			type: 'string',
			source: 'html',
			selector: '.bio',
		},
		imgUrl: {
			type: 'string',
			default: 'https://placehold.it/75',  //this is a site for free place holder images, 75 is the size 75x75
		},
	},


	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		let {attributes: {name, position, bio, imgUrl}, setAttributes, className} = props;
		function changeName(value){
			setAttributes({name: value});
		}
		function changePosition(value){
			setAttributes({position: value});
		}
		function changeBio(value){
			setAttributes({bio: value});
		}
		function selectImage(value) {
			setAttributes({imgUrl: value.sizes.thumbnail.url}); //thumbnail, medium, full are options
		}


		// Creates a <p class='wp-block-cgb-block-staff-block'></p>.
		return (
			<div className={ props.className }>
				<div className="quote-profile">
					<div className="photo">
						<MediaUploadCheck>
							<MediaUpload
								allowedTypes={['image']} //can select what file types are allowed, images, pdf, sound, etc
								onSelect={selectImage}
								render={({open}) =>		//render is what do we want the user to click on to open the uploader for the image, js arrow function but {open} is to grab react component
									<img src={imgUrl} onClick={open}/>
								}
							/>
						</MediaUploadCheck>
					</div>
					<div className="text">
						<PlainText className="name"
								   value={name}
								   onChange={changeName}
								   placeholder="Mr. John Doe"
						/>
					</div>
					<div className="text">
						<PlainText className="position"
								   value={position}
								   onChange={changePosition}
								   placeholder="Calculus"
						/>
					</div>
				</div>
				<RichText className="quote"
						  tagName="div"
						  value={bio}
						  onChange={changeBio}
						  placeholder="Lorem Ipsum blaah blah blah"
				/>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		return (
			<div className={ props.className }>
				<div className="quote-profile">
					<div className="photo">
						<img src={props.attributes.imgUrl}/>
					</div>
					<div className="text">
						<p className="name">{props.attributes.name}</p>
						<p className="position">{props.attributes.position}</p>
					</div>
				</div>
				<RichText.Content tagName="div" className="quote" value={props.attributes.bio}/>
			</div>
		);
	},
} );
