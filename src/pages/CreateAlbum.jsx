/* eslint-disable react/no-unescaped-entities */
import React, {useRef, useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import cx from 'classnames'
import axios from 'axios'

import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import InfoIcon from '@material-ui/icons/Info'
import {ClipLoader} from 'react-spinners'
import {useWeb3React} from '@web3-react/core'
import {ethers} from 'ethers'
import showToast from '../components/toast'

import BootstrapTooltip from '../components/BootstrapTooltip'

import {useApi} from '../api'
import {useFactoryContract, getSigner} from '../contract/factory'

import uploadIcon from '../components/assets/upload.png'
import plusIcon from '../components/assets/plus.svg'
import closeIcon from '../components/assets/close.svg'

import styles from './styles.module.scss'
import {formatError, isAddress} from '../utils'


const CollectionCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {account} = useWeb3React();
  const {authToken} = useSelector(state => state.ConnectWallet)
  const {apiUrl, getNonce} = useApi()
  const {
    getSongAlbumSingleFactoryContract,
    // getSongAlbumFactoryContract,
    createNFTContract,
  } = useFactoryContract()

  const inputRef = useRef(null)
  const [isRegister, setIsRegister] = useState(false);

  const [deploying, setDeploying] = useState(false)
  const [creating, setCreating] = useState(false)
  const [logo, setLogo] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selected, setSelected] = useState([])
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(null)
  const [symbol, setSymbol] = useState('')
  const [symbolError, setSymbolError] = useState(null)
  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState(null)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(null)
  const [address, setAddress] = useState('')
  const [addressError, setAddressError] = useState('')


  const isMenuOpen = Boolean(anchorEl)

  useEffect(() => {
    setLogo(null)
    setAnchorEl(null)
    setSelected([])
    setName('')
    setNameError(null)
    setSymbol('')
    setSymbolError(null)
    setDescription('')
    setDescriptionError(null)
    setEmail('')
    setEmailError(null)
    setAddress('')
    setAddressError(null)
  
  }, [isRegister])

  const removeImage = () => {
    setLogo(null)
  }

  const handleFileSelect = e => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0]

      const reader = new FileReader()

      reader.onload = function (e) {
        setLogo(e.target.result)
      }

      reader.readAsDataURL(file)
    }
  }

  const validateName = () => {
    if (name.length === 0) {
      setNameError("This field can't be blank")
    } else {
      setNameError(null)
    }
  }

  const validateSymbol = () => {
    if (symbol.length === 0) {
      setSymbolError("This field can't be blank")
    } else if (symbol.includes(' ')) {
      setSymbolError("Symbol can't include spaces")
    } else {
      setSymbolError(null)
    }
  }

  const validateDescription = () => {
    if (description.length === 0) {
      setDescriptionError("This field can't be blank")
    } else {
      setDescriptionError(null)
    }
  }


  const validEmail = email => /(.+)@(.+){2,}\.(.+){2,}/.test(email)

  const validateEmail = () => {
    if (email.length === 0) {
      setEmailError("This field can't be blank")
    } else if (validEmail(email)) {
      setEmailError(null)
    } else {
      setEmailError('Invalid email address.')
    }
  }


  const handleMenuClose = () => {
    setAnchorEl(null)
  }


  const isValid = (() => {
    if (!logo) return false
    if (nameError) return false
    if (descriptionError) return false
    if (addressError) return false
    if (!isRegister && (symbol.length === 0 || symbol.includes(' ')))
      return false
    if (email.length === 0) return false
    if (!validEmail(email)) return false
    return true
  })()

  const clipImage = (image, clipX, clipY, clipWidth, clipHeight, cb) => {
    const CANVAS_SIZE = 128
    const canvas = document.createElement('canvas')
    canvas.width = CANVAS_SIZE
    canvas.height = CANVAS_SIZE
    const ctx = canvas.getContext('2d')
    ctx.drawImage(
      image,
      clipX,
      clipY,
      clipWidth,
      clipHeight,
      0,
      0,
      CANVAS_SIZE,
      CANVAS_SIZE
    )
    cb(canvas.toDataURL())
  }

  const handleRegister = async () => {
    if (creating) return

    setCreating(true)

    const img = new Image()
    img.onload = function () {
      const w = this.width
      const h = this.height
      const size = Math.min(w, h)
      const x = (w - size) / 2
      const y = (h - size) / 2
      clipImage(img, x, y, size, size, async logodata => {
        try {
          const {data: nonce} = await getNonce(account, authToken)

          let signature
          let signatureAddress

          try {
            const signer = await getSigner()
            const msg = `Approve Signature on Song Album with nonce ${nonce}`

            signature = await signer.signMessage(msg)
            signatureAddress = ethers.utils.verifyMessage(msg, signature)
          } catch (err) {
            showToast(
              'error',
              'You need to sign the message to be able to register a collection.'
            )
            setCreating(false)
            return
          }

          const formData = new FormData()
          formData.append('collectionName', name)
          formData.append('nftAddress', address)
          formData.append('imgData', logodata)
          const result = await axios({
            method: 'post',
            url: `${apiUrl}/ipfs/uploadCollectionImage2Server`,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${authToken}`,
            },
          })

          const logoImageHash = result.data.data
          const data = {
            email,
            nftAddress: address,
            collectionName: name,
            description,
            categories: selected.join(','),
            logoImageHash,
            signature,
            signatureAddress,
          }

          await axios({
            method: 'post',
            url: `${apiUrl}/collection/collectiondetails`,
            data: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          })

          showToast(
            'success',
            'Application submitted!',
            'Your collection registration application is successfully submitted for review.\nOnce approved, you will get an email notification.'
          )

          setCreating(false)

          // history.push('/create')
          navigate('/create')
        } catch (e) {
          console.log('Error: ', e)
          setCreating(false)
        }
      })
    }
    img.src = logo
  }

  const handleCreate = async () => {
    setDeploying(true)
    console.log('album name is ', name)
    console.log('album artist is ', symbol)
    console.log('creater is ', account)
    try {
      const tx = await createNFTContract(
        await getSongAlbumSingleFactoryContract(),
          
        name,
        symbol,
        "5000000000000000",
        account
      )
      const res = await tx.wait()
      res.events.map(evt => {
        if (
          evt.topics[0] ===
          '0x2d49c67975aadd2d389580b368cfff5b49965b0bd5da33c144922ce01e7a4d7b'
          // '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
        ) {
          setDeploying(false)
          setCreating(true)

          const address = ethers.utils.hexDataSlice(evt.data, 44)

          const img = new Image()
          img.onload = function () {
            const w = this.width
            const h = this.height
            const size = Math.min(w, h)
            const x = (w - size) / 2
            const y = (h - size) / 2
            clipImage(img, x, y, size, size, async logodata => {
              try {
                const {data: nonce} = await getNonce(account, authToken)

                let signature
                let signatureAddress
                try {
                  const signer = await getSigner()
                  const msg = `Approve Signature on CentralWorld with nonce ${nonce}`
                  signature = await signer.signMessage(msg)
                  signatureAddress = ethers.utils.verifyMessage(msg, signature)
                } catch (err) {
                  showToast(
                    'error',
                    'You need to sign the message to be able to create a collection.'
                  )
                  setCreating(false)
                  return
                }

                const formData = new FormData()
                formData.append('collectionName', name);
                formData.append('symbol', symbol);
                formData.append('nftAddress', address);
                formData.append('imgData', logodata);
                const result = await axios({
                  method: 'post',
                  url: `${apiUrl}/ipfs/uploadCollectionImage2Server`,
                  data: formData,
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authToken}`,
                  },
                })
                const logoImageHash = result.data.data
                const data = {
                  email,
                  nftAddress: address,
                  collectionName: name,
                  symbol:symbol,
                  description,
                  logoImageHash,
                  signature,
                  signatureAddress
                }
                console.log('collection data is ', authToken)
                const resultsavedata = await axios({
                  method: 'post',
                  url: `${apiUrl}/collectionSongAlbum/collectiondetails`,
                  data: JSON.stringify(data),
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                  },
                })
                console.log('the result of NFT saved data is ', resultsavedata);
                if(resultsavedata.data.status == "success"){
                  showToast('success', 'Album has been created successfully! ', ' This album address is ' + resultsavedata.data.data.erc721Address)
                  setCreating(false)
                  // history.push('/create')
                  navigate('/create')
                }
                else {
                  showToast('error', 'Collection created but data saving faild.')
                  setCreating(false)
                }
              } catch (e) {
                setCreating(false)
              }
            })
          }
          img.src = logo
        }
      })
    } catch (err) {
      showToast('error', formatError(err))
      console.log(err)
      setDeploying(false)
    }
  }

  

  return (
    <div className={styles.container}>
 
      <div className={styles.inner}>
        <div className={styles.title}>
          {isRegister ? 'Register' : 'Create New'} Album
        </div>
        <br/>
        <div style={{fontSize: '13px'}}>
          Please submit using the owner address of the collection. If you cannot
          use the owner address, please email us.foundation
          with the information below (and proof of collection ownership, such as
          from the collection's official email address).
        </div>
            
        <div className={styles.inputGroup}>
          <div className={styles.inputTitle}>Song Album Image *</div>
          <div className={styles.inputSubTitle}>
            This image will be the logo of this song album.
            And it will also be used for navigation. 300x300 recommended.
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.logoUploadBox}>
              {logo ? (
                <>
                  <img src={logo}/>
                  <div className={styles.removeOverlay}>
                    <div className={styles.removeIcon} onClick={removeImage}>
                      <img src={closeIcon}/>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className={styles.uploadOverlay}
                  onClick={() => inputRef.current?.click()}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileSelect}
                  />
                  <div className={styles.upload}>
                    <div className={styles.uploadInner}>
                      <img src={uploadIcon}/>
                    </div>
                    <div className={styles.plusIcon}>
                      <img src={plusIcon}/>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputTitle}>Title *</div>
          <div className={styles.inputWrapper}>
            <input
              className={cx(styles.input, nameError && styles.hasError)}
              maxLength={40}
              placeholder="Album Title"
              value={name}
              onChange={e => setName(e.target.value)}
              onBlur={validateName}
            />
            <div className={styles.lengthIndicator}>{name.length}/40</div>
            {nameError && <div className={styles.error}>{nameError}</div>}
          </div>
        </div>

        
          <div className={styles.inputGroup}>
            <div className={styles.inputTitle}>
              Artist Name*&nbsp;
              
            </div>
            <div className={styles.inputWrapper}>
              <input
                className={cx(styles.input, symbolError && styles.hasError)}
                maxLength={20}
                placeholder="Artist Name"
                value={symbol}
                onChange={e => setSymbol(e.target.value)}
                onBlur={validateSymbol}
              />
              <div className={styles.lengthIndicator}>{symbol.length}/20</div>
              {symbolError && <div className={styles.error}>{symbolError}</div>}
            </div>
          </div>


        <div className={styles.inputGroup}>
          <div className={styles.inputTitle}>Description *</div>
          <div className={styles.inputWrapper}>
            <textarea
              className={cx(
                styles.input,
                styles.longInput,
                descriptionError && styles.hasError
              )}
              maxLength={200}
              placeholder="Provide your description for this Album"
              value={description}
              onChange={e => setDescription(e.target.value)}
              onBlur={validateDescription}
            />
            <div className={styles.lengthIndicator}>
              {description.length}/200
            </div>
            {descriptionError && (
              <div className={styles.error}>{descriptionError}</div>
            )}
          </div>
        </div>

        

        <div className={styles.inputGroup}>
          <div className={styles.inputTitle}>
            Contact Email *&nbsp;
            <BootstrapTooltip
              title="We will use this email to notify you about this album application. This will not be shared with others."
              placement="top"
            >
              <HelpOutlineIcon/>
            </BootstrapTooltip>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={cx(styles.input, emailError && styles.hasError)}
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={validateEmail}
            />
            {emailError && <div className={styles.error}>{emailError}</div>}
          </div>
        </div>

        <div className={styles.buttonsWrapper}>
          {isRegister ? (
            <div
              className={cx(
                styles.createButton,
                (creating || !isValid) && styles.disabled
              )}
              onClick={isValid ? handleRegister : null}
            >
              {creating ? <ClipLoader color="#FFF" size={16}/> : 'Submit'}
            </div>
          ) : (
            <div
              className={cx(
                styles.createButton,
                (creating || deploying || !isValid) && styles.disabled
              )}
              onClick={isValid && !creating && !deploying ? handleCreate : null}
            >
              {creating ? (
                <ClipLoader color="#FFF" size={16}/>
              ) : deploying ? (
                'Deploying'
              ) : (
                'Create'
              )}
            </div>
          )}
        </div>
        {!isRegister && (
          <div className={styles.fee}>
            <InfoIcon/>
            &nbsp;0.5 AVAX are charged to create a new .
          </div>
        )}

      </div>

    </div>
  )
}

export default CollectionCreate
