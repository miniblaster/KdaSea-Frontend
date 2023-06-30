import React, {useEffect, useRef, useState, useCallback} from 'react'

import Select from 'react-dropdown-select'

import styles from './styles.module.scss'



const PaintBoard = () => {
  const [collectionName, setCollectionName] =  useState();
  const [albums, setAlbums] = useState([
    {
      album: "GREATEST HITS LIVE",
      artist: " CHIC",
    },
    {
      album: " ALEX LOVES",
      artist: "ALEXANDER O’NEAL",
    },
    {
      album: " LIVE MY LIFE",
      artist: "2 PAC",
    },
    {
      album: "USHER & FRIENDS VOL.2	",
      artist: "USHER AND FRIENDS	",
    },
    {
      album: "USHER & FRIENDS VOL.1	",
      artist: "USHER AND FRIENDS	",
    },
    {
      album: "EXIT WOUNDS - SOUNDTRACK for FILM",
      artist: "VARIOUS",
    },
  ]);

  useEffect(()=>{
    setAlbums([
      {
        album: "GREATEST HITS LIVE",
        artist: " CHIC",
      },
      {
        album: " ALEX LOVES",
        artist: "ALEXANDER O’NEAL",
      },
      {
        album: " LIVE MY LIFE",
        artist: "2 PAC",
      },
      {
        album: "USHER & FRIENDS VOL.2	",
        artist: "USHER AND FRIENDS	",
      },
      {
        album: "USHER & FRIENDS VOL.1	",
        artist: "USHER AND FRIENDS	",
      },
      {
        album: "EXIT WOUNDS - SOUNDTRACK for FILM",
        artist: "VARIOUS",
      },
    ])
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        
        <div className={styles.panel}>
          <div className={styles.panelInputs}>
            <div className={styles.panelLeft}>
              <div className={styles.formGroup}>
                <p className={styles.formLabel}>Albums</p>
                <Select
                  options={albums}
                  disabled={false}
                  values={albums[0]}
                  onChange={([col]) => {
                   
                    setCollectionName(col.collectionName)
                  }}
                  className={styles.select}
                  placeholder="Choose Collection"
                  itemRenderer={({item, methods}) => (
                    <div
                      key={item.artist}
                      className={styles.collection}
                      onClick={() => {
                        methods.clearAll()
                        methods.addItem(item)
                      }}
                    >
                      <img
                        src={`https://cloudflare-ipfs.com/ipfs/${item.logoImageHash}`}
                        className={styles.collectionLogo}
                      />
                      <div className={styles.collectionName}>
                        {item.album}
                      </div>
                    </div>
                  )}
                  contentRenderer={({props: {values}}) =>
                    values.length > 0 ? (
                      <div className={styles.collection}>
                        <img
                          src={`https://cloudflare-ipfs.com/ipfs/${values[0].logoImageHash}`}
                          className={styles.collectionLogo}
                        />
                        <div className={styles.collectionName}>
                          {values[0].album}
                        </div>
                      </div>
                    ) : (
                      <div className={styles.collection}/>
                    )
                  }
                />
              </div>
              
            </div>
            
          </div>

        </div>
      </div>
    </div>
  )
}

export default PaintBoard
