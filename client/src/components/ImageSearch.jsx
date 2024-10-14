import React, { useEffect, useState } from 'react'
import axios from "axios"
import MyImage from './MyImage'
import searchIcon from '../assets/icons/searchIcon.svg'
import MainSlider from './Slider/MainSlider'

let result = {
    "total": 10000,
    "total_pages": 1000,
    "results": [
        {
            "id": "qO-PIF84Vxg",
            "slug": "shallow-focus-photography-of-white-shih-tzu-puppy-running-on-the-grass-qO-PIF84Vxg",
            "alternative_slugs": {
                "en": "shallow-focus-photography-of-white-shih-tzu-puppy-running-on-the-grass-qO-PIF84Vxg",
                "es": "fotografia-de-enfoque-superficial-de-cachorro-blanco-de-shih-tzu-corriendo-sobre-la-hierba-qO-PIF84Vxg",
                "ja": "芝生の上を走る白いシーズーの子犬の浅い焦点写真-qO-PIF84Vxg",
                "fr": "photographie-a-mise-au-point-peu-profonde-dun-chiot-shih-tzu-blanc-courant-sur-lherbe-qO-PIF84Vxg",
                "it": "fotografia-a-fuoco-superficiale-del-cucciolo-bianco-di-shih-tzu-che-corre-sullerba-qO-PIF84Vxg",
                "ko": "풀밭에서-달리는-흰색-shih-tzu-강아지의-얕은-초점-사진-qO-PIF84Vxg",
                "de": "flachfokusfotografie-eines-weissen-shih-tzu-welpen-der-auf-dem-gras-lauft-qO-PIF84Vxg",
                "pt": "fotografia-de-foco-raso-do-filhote-de-cachorro-branco-de-shih-tzu-correndo-na-grama-qO-PIF84Vxg"
            },
            "created_at": "2018-08-15T21:11:28Z",
            "updated_at": "2024-10-10T07:51:23Z",
            "promoted_at": null,
            "width": 5184,
            "height": 3456,
            "color": "#0c2626",
            "blur_hash": "LC8;fFD~9E^-ICVuWUt7D~xv%3IT",
            "description": "Fluffy cockapoo having the time of his life at the park",
            "alt_description": "shallow focus photography of white shih tzu puppy running on the grass",
            "breadcrumbs": [],
            "urls": {
                "raw": "https://images.unsplash.com/photo-1534361960057-19889db9621e?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwxfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3",
                "full": "https://images.unsplash.com/photo-1534361960057-19889db9621e?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwxfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=85",
                "regular": "https://images.unsplash.com/photo-1534361960057-19889db9621e?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwxfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080",
                "small": "https://images.unsplash.com/photo-1534361960057-19889db9621e?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwxfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400",
                "thumb": "https://images.unsplash.com/photo-1534361960057-19889db9621e?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwxfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1534361960057-19889db9621e"
            },
            "links": {
                "self": "https://api.unsplash.com/photos/shallow-focus-photography-of-white-shih-tzu-puppy-running-on-the-grass-qO-PIF84Vxg",
                "html": "https://unsplash.com/photos/shallow-focus-photography-of-white-shih-tzu-puppy-running-on-the-grass-qO-PIF84Vxg",
                "download": "https://unsplash.com/photos/qO-PIF84Vxg/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwxfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA",
                "download_location": "https://api.unsplash.com/photos/qO-PIF84Vxg/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwxfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA"
            },
            "likes": 2466,
            "liked_by_user": false,
            "current_user_collections": [],
            "sponsorship": null,
            "topic_submissions": {},
            "asset_type": "photo",
            "user": {
                "id": "s_n3DlAm8iY",
                "updated_at": "2024-10-11T05:38:00Z",
                "username": "joeyc",
                "name": "Joe Caione",
                "first_name": "Joe",
                "last_name": "Caione",
                "twitter_username": "_JoeyC_",
                "portfolio_url": "http://MadeByJoeyC.com",
                "bio": "🍕🏀",
                "location": "Cleveland, OH",
                "links": {
                    "self": "https://api.unsplash.com/users/joeyc",
                    "html": "https://unsplash.com/@joeyc",
                    "photos": "https://api.unsplash.com/users/joeyc/photos",
                    "likes": "https://api.unsplash.com/users/joeyc/likes",
                    "portfolio": "https://api.unsplash.com/users/joeyc/portfolio",
                    "following": "https://api.unsplash.com/users/joeyc/following",
                    "followers": "https://api.unsplash.com/users/joeyc/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1446647338458-f976efa11db9?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
                    "medium": "https://images.unsplash.com/profile-1446647338458-f976efa11db9?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
                    "large": "https://images.unsplash.com/profile-1446647338458-f976efa11db9?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"
                },
                "instagram_username": "ShotByJoeyC",
                "total_collections": 0,
                "total_likes": 153,
                "total_photos": 23,
                "total_promoted_photos": 8,
                "total_illustrations": 0,
                "total_promoted_illustrations": 0,
                "accepted_tos": true,
                "for_hire": true,
                "social": {
                    "instagram_username": "ShotByJoeyC",
                    "portfolio_url": "http://MadeByJoeyC.com",
                    "twitter_username": "_JoeyC_",
                    "paypal_email": null
                }
            }
        },
        {
            "id": "pgUbpDLJh3E",
            "slug": "selective-focus-photography-of-golden-labrador-retriever-pgUbpDLJh3E",
            "alternative_slugs": {
                "en": "selective-focus-photography-of-golden-labrador-retriever-pgUbpDLJh3E",
                "es": "fotografia-de-enfoque-selectivo-del-labrador-golden-retriever-pgUbpDLJh3E",
                "ja": "ゴールデンラブラドールレトリバーのセレクティブフォーカス撮影-pgUbpDLJh3E",
                "fr": "photographie-selective-de-mise-au-point-du-labrador-golden-retriever-pgUbpDLJh3E",
                "it": "fotografia-a-fuoco-selettiva-del-labrador-retriever-dorato-pgUbpDLJh3E",
                "ko": "골든-래브라도-리트리버의-선택적-초점-사진-pgUbpDLJh3E",
                "de": "selektive-fokusfotografie-des-golden-labrador-retrievers-pgUbpDLJh3E",
                "pt": "fotografia-de-foco-seletivo-do-labrador-retriever-dourado-pgUbpDLJh3E"
            },
            "created_at": "2015-01-29T20:58:48Z",
            "updated_at": "2024-10-13T00:00:25Z",
            "promoted_at": "2015-01-29T20:58:48Z",
            "width": 5184,
            "height": 3456,
            "color": "#d9d9d9",
            "blur_hash": "LVKv]b9H5X-.%%IUofNIo}ROn#oe",
            "description": "Golden retriever dog",
            "alt_description": "selective focus photography of golden Labrador retriever",
            "breadcrumbs": [
                {
                    "slug": "images",
                    "title": "1,000,000+ Free Images",
                    "index": 0,
                    "type": "landing_page"
                },
                {
                    "slug": "feelings",
                    "title": "Feelings Images",
                    "index": 1,
                    "type": "landing_page"
                },
                {
                    "slug": "funny",
                    "title": "Funny Images \u0026 Pictures",
                    "index": 2,
                    "type": "landing_page"
                }
            ],
            "urls": {
                "raw": "https://images.unsplash.com/photo-1422565096762-bdb997a56a84?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwyfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3",
                "full": "https://images.unsplash.com/photo-1422565096762-bdb997a56a84?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwyfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=85",
                "regular": "https://images.unsplash.com/photo-1422565096762-bdb997a56a84?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwyfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080",
                "small": "https://images.unsplash.com/photo-1422565096762-bdb997a56a84?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwyfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400",
                "thumb": "https://images.unsplash.com/photo-1422565096762-bdb997a56a84?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwyfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1422565096762-bdb997a56a84"
            },
            "links": {
                "self": "https://api.unsplash.com/photos/selective-focus-photography-of-golden-labrador-retriever-pgUbpDLJh3E",
                "html": "https://unsplash.com/photos/selective-focus-photography-of-golden-labrador-retriever-pgUbpDLJh3E",
                "download": "https://unsplash.com/photos/pgUbpDLJh3E/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwyfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA",
                "download_location": "https://api.unsplash.com/photos/pgUbpDLJh3E/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwyfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA"
            },
            "likes": 571,
            "liked_by_user": false,
            "current_user_collections": [],
            "sponsorship": null,
            "topic_submissions": {},
            "asset_type": "photo",
            "user": {
                "id": "R0TLZTU1YrI",
                "updated_at": "2024-10-11T00:07:36Z",
                "username": "calebjamesfisher",
                "name": "Caleb Fisher",
                "first_name": "Caleb",
                "last_name": "Fisher",
                "twitter_username": "calebjfisher",
                "portfolio_url": null,
                "bio": "Texas-born content creator currently working for the United States Senate in Washington, D.C.",
                "location": "Washington, DC",
                "links": {
                    "self": "https://api.unsplash.com/users/calebjamesfisher",
                    "html": "https://unsplash.com/@calebjamesfisher",
                    "photos": "https://api.unsplash.com/users/calebjamesfisher/photos",
                    "likes": "https://api.unsplash.com/users/calebjamesfisher/likes",
                    "portfolio": "https://api.unsplash.com/users/calebjamesfisher/portfolio",
                    "following": "https://api.unsplash.com/users/calebjamesfisher/following",
                    "followers": "https://api.unsplash.com/users/calebjamesfisher/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1573685337174-31958d889436image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
                    "medium": "https://images.unsplash.com/profile-1573685337174-31958d889436image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
                    "large": "https://images.unsplash.com/profile-1573685337174-31958d889436image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"
                },
                "instagram_username": "calebjfisher",
                "total_collections": 1,
                "total_likes": 2,
                "total_photos": 126,
                "total_promoted_photos": 34,
                "total_illustrations": 0,
                "total_promoted_illustrations": 0,
                "accepted_tos": true,
                "for_hire": false,
                "social": {
                    "instagram_username": "calebjfisher",
                    "portfolio_url": null,
                    "twitter_username": "calebjfisher",
                    "paypal_email": null
                }
            }
        },
        {
            "id": "mx0DEnfYxic",
            "slug": "long-coated-black-and-white-dog-during-daytime-mx0DEnfYxic",
            "alternative_slugs": {
                "en": "long-coated-black-and-white-dog-during-daytime-mx0DEnfYxic",
                "es": "perro-blanco-y-negro-de-pelo-largo-durante-el-dia-mx0DEnfYxic",
                "ja": "昼間はロングコートの黒と白の犬-mx0DEnfYxic",
                "fr": "chien-noir-et-blanc-a-poil-long-pendant-la-journee-mx0DEnfYxic",
                "it": "cane-bianco-e-nero-a-pelo-lungo-durante-il-giorno-mx0DEnfYxic",
                "ko": "낮-동안-긴-코팅-된-흑백-개-mx0DEnfYxic",
                "de": "langhaariger-schwarz-weisser-hund-tagsuber-mx0DEnfYxic",
                "pt": "cao-preto-e-branco-de-pelagem-longa-durante-o-dia-mx0DEnfYxic"
            },
            "created_at": "2017-08-20T19:12:54Z",
            "updated_at": "2024-10-09T16:14:21Z",
            "promoted_at": "2017-08-21T10:52:34Z",
            "width": 2848,
            "height": 4288,
            "color": "#597373",
            "blur_hash": "LTD]uSR*JB%20KkCjYWBozae%MS4",
            "description": "Border Collie",
            "alt_description": "long-coated black and white dog during daytime",
            "breadcrumbs": [],
            "urls": {
                "raw": "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwzfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3",
                "full": "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwzfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=85",
                "regular": "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwzfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080",
                "small": "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwzfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400",
                "thumb": "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwzfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1503256207526-0d5d80fa2f47"
            },
            "links": {
                "self": "https://api.unsplash.com/photos/long-coated-black-and-white-dog-during-daytime-mx0DEnfYxic",
                "html": "https://unsplash.com/photos/long-coated-black-and-white-dog-during-daytime-mx0DEnfYxic",
                "download": "https://unsplash.com/photos/mx0DEnfYxic/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwzfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA",
                "download_location": "https://api.unsplash.com/photos/mx0DEnfYxic/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwzfHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA"
            },
            "likes": 2759,
            "liked_by_user": false,
            "current_user_collections": [],
            "sponsorship": null,
            "topic_submissions": {
                "animals": {
                    "status": "approved",
                    "approved_on": "2020-04-06T14:20:16Z"
                }
            },
            "asset_type": "photo",
            "user": {
                "id": "bxCGdD_L48g",
                "updated_at": "2023-09-13T01:25:08Z",
                "username": "baptiststandaert",
                "name": "Baptist Standaert",
                "first_name": "Baptist",
                "last_name": "Standaert",
                "twitter_username": "BStandaert",
                "portfolio_url": "https://www.behance.net/BaptistStandaert",
                "bio": null,
                "location": "Brugge",
                "links": {
                    "self": "https://api.unsplash.com/users/baptiststandaert",
                    "html": "https://unsplash.com/@baptiststandaert",
                    "photos": "https://api.unsplash.com/users/baptiststandaert/photos",
                    "likes": "https://api.unsplash.com/users/baptiststandaert/likes",
                    "portfolio": "https://api.unsplash.com/users/baptiststandaert/portfolio",
                    "following": "https://api.unsplash.com/users/baptiststandaert/following",
                    "followers": "https://api.unsplash.com/users/baptiststandaert/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1581370012090-d3c02fd5d56bimage?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
                    "medium": "https://images.unsplash.com/profile-1581370012090-d3c02fd5d56bimage?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
                    "large": "https://images.unsplash.com/profile-1581370012090-d3c02fd5d56bimage?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"
                },
                "instagram_username": "baptiststandaert",
                "total_collections": 0,
                "total_likes": 28,
                "total_photos": 6,
                "total_promoted_photos": 3,
                "total_illustrations": 0,
                "total_promoted_illustrations": 0,
                "accepted_tos": false,
                "for_hire": false,
                "social": {
                    "instagram_username": "baptiststandaert",
                    "portfolio_url": "https://www.behance.net/BaptistStandaert",
                    "twitter_username": "BStandaert",
                    "paypal_email": null
                }
            }
        },
        {
            "id": "AbNO2iejoXA",
            "slug": "a-brown-dog-sitting-on-top-of-a-sandy-beach-AbNO2iejoXA",
            "alternative_slugs": {
                "en": "a-brown-dog-sitting-on-top-of-a-sandy-beach-AbNO2iejoXA",
                "es": "un-perro-marron-sentado-en-la-cima-de-una-playa-de-arena-AbNO2iejoXA",
                "ja": "砂浜の上に座る茶色の犬-AbNO2iejoXA",
                "fr": "un-chien-brun-assis-au-sommet-dune-plage-de-sable-AbNO2iejoXA",
                "it": "un-cane-marrone-seduto-in-cima-a-una-spiaggia-sabbiosa-AbNO2iejoXA",
                "ko": "모래-해변-위에-앉아있는-갈색-개-AbNO2iejoXA",
                "de": "ein-brauner-hund-der-auf-einem-sandstrand-sitzt-AbNO2iejoXA",
                "pt": "um-cao-marrom-sentado-em-cima-de-uma-praia-de-areia-AbNO2iejoXA"
            },
            "created_at": "2017-09-07T23:18:53Z",
            "updated_at": "2024-10-13T15:04:38Z",
            "promoted_at": "2017-09-07T23:38:43Z",
            "width": 3226,
            "height": 4839,
            "color": "#f3f3f3",
            "blur_hash": "LyN^e?I:tRxu?^SOWBWBE1S3RjWB",
            "description": "Cockerpoo",
            "alt_description": "a brown dog sitting on top of a sandy beach",
            "breadcrumbs": [],
            "urls": {
                "raw": "https://images.unsplash.com/photo-1504826260979-242151ee45b7?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw0fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3",
                "full": "https://images.unsplash.com/photo-1504826260979-242151ee45b7?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw0fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=85",
                "regular": "https://images.unsplash.com/photo-1504826260979-242151ee45b7?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw0fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080",
                "small": "https://images.unsplash.com/photo-1504826260979-242151ee45b7?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw0fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400",
                "thumb": "https://images.unsplash.com/photo-1504826260979-242151ee45b7?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw0fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1504826260979-242151ee45b7"
            },
            "links": {
                "self": "https://api.unsplash.com/photos/a-brown-dog-sitting-on-top-of-a-sandy-beach-AbNO2iejoXA",
                "html": "https://unsplash.com/photos/a-brown-dog-sitting-on-top-of-a-sandy-beach-AbNO2iejoXA",
                "download": "https://unsplash.com/photos/AbNO2iejoXA/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw0fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA",
                "download_location": "https://api.unsplash.com/photos/AbNO2iejoXA/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw0fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA"
            },
            "likes": 2502,
            "liked_by_user": false,
            "current_user_collections": [],
            "sponsorship": null,
            "topic_submissions": {
                "wallpapers": {
                    "status": "approved",
                    "approved_on": "2021-03-22T14:41:13Z"
                },
                "animals": {
                    "status": "approved",
                    "approved_on": "2020-04-06T14:20:16Z"
                }
            },
            "asset_type": "photo",
            "user": {
                "id": "OOlP2c2_w_4",
                "updated_at": "2024-10-11T12:55:02Z",
                "username": "rwltn1",
                "name": "Ryan Walton",
                "first_name": "Ryan",
                "last_name": "Walton",
                "twitter_username": null,
                "portfolio_url": null,
                "bio": null,
                "location": null,
                "links": {
                    "self": "https://api.unsplash.com/users/rwltn1",
                    "html": "https://unsplash.com/@rwltn1",
                    "photos": "https://api.unsplash.com/users/rwltn1/photos",
                    "likes": "https://api.unsplash.com/users/rwltn1/likes",
                    "portfolio": "https://api.unsplash.com/users/rwltn1/portfolio",
                    "following": "https://api.unsplash.com/users/rwltn1/following",
                    "followers": "https://api.unsplash.com/users/rwltn1/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1504826550317-3c502b97e088?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
                    "medium": "https://images.unsplash.com/profile-1504826550317-3c502b97e088?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
                    "large": "https://images.unsplash.com/profile-1504826550317-3c502b97e088?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"
                },
                "instagram_username": null,
                "total_collections": 0,
                "total_likes": 14,
                "total_photos": 5,
                "total_promoted_photos": 5,
                "total_illustrations": 0,
                "total_promoted_illustrations": 0,
                "accepted_tos": false,
                "for_hire": false,
                "social": {
                    "instagram_username": null,
                    "portfolio_url": null,
                    "twitter_username": null,
                    "paypal_email": null
                }
            }
        },
        {
            "id": "K4mSJ7kc0As",
            "slug": "black-dog-wearing-blue-denim-collar-K4mSJ7kc0As",
            "alternative_slugs": {
                "en": "black-dog-wearing-blue-denim-collar-K4mSJ7kc0As",
                "es": "perro-negro-con-collar-de-mezclilla-azul-K4mSJ7kc0As",
                "ja": "ブルーデニムの襟を着た黒い犬-K4mSJ7kc0As",
                "fr": "chien-noir-portant-un-collier-en-jean-bleu-K4mSJ7kc0As",
                "it": "cane-nero-che-indossa-collare-di-jeans-blu-K4mSJ7kc0As",
                "ko": "블루-데님-칼라를-입은-검은-개-K4mSJ7kc0As",
                "de": "schwarzer-hund-tragt-blaues-jeanshalsband-K4mSJ7kc0As",
                "pt": "cao-preto-vestindo-coleira-jeans-azul-K4mSJ7kc0As"
            },
            "created_at": "2018-02-07T16:21:22Z",
            "updated_at": "2024-10-13T12:07:29Z",
            "promoted_at": "2018-02-08T14:29:58Z",
            "width": 2776,
            "height": 3866,
            "color": "#d9d9d9",
            "blur_hash": "LZK1]@Rj_Nae~Wa#M{of_3WBIAWV",
            "description": "Toshi (black pug) wearing my pilot jacket.",
            "alt_description": "black dog wearing blue denim collar",
            "breadcrumbs": [
                {
                    "slug": "images",
                    "title": "1,000,000+ Free Images",
                    "index": 0,
                    "type": "landing_page"
                },
                {
                    "slug": "feelings",
                    "title": "Feelings Images",
                    "index": 1,
                    "type": "landing_page"
                },
                {
                    "slug": "congratulations",
                    "title": "Congratulations Images",
                    "index": 2,
                    "type": "landing_page"
                }
            ],
            "urls": {
                "raw": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw1fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3",
                "full": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw1fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=85",
                "regular": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw1fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080",
                "small": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw1fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400",
                "thumb": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw1fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1518020382113-a7e8fc38eac9"
            },
            "links": {
                "self": "https://api.unsplash.com/photos/black-dog-wearing-blue-denim-collar-K4mSJ7kc0As",
                "html": "https://unsplash.com/photos/black-dog-wearing-blue-denim-collar-K4mSJ7kc0As",
                "download": "https://unsplash.com/photos/K4mSJ7kc0As/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw1fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA",
                "download_location": "https://api.unsplash.com/photos/K4mSJ7kc0As/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw1fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA"
            },
            "likes": 3886,
            "liked_by_user": false,
            "current_user_collections": [],
            "sponsorship": null,
            "topic_submissions": {
                "animals": {
                    "status": "approved",
                    "approved_on": "2020-04-06T14:20:16Z"
                }
            },
            "asset_type": "photo",
            "user": {
                "id": "mA08QQzQf8Y",
                "updated_at": "2024-10-09T14:04:00Z",
                "username": "charlesdeluvio",
                "name": "charlesdeluvio",
                "first_name": "charlesdeluvio",
                "last_name": null,
                "twitter_username": null,
                "portfolio_url": null,
                "bio": "Graphic designer",
                "location": "Montreal",
                "links": {
                    "self": "https://api.unsplash.com/users/charlesdeluvio",
                    "html": "https://unsplash.com/@charlesdeluvio",
                    "photos": "https://api.unsplash.com/users/charlesdeluvio/photos",
                    "likes": "https://api.unsplash.com/users/charlesdeluvio/likes",
                    "portfolio": "https://api.unsplash.com/users/charlesdeluvio/portfolio",
                    "following": "https://api.unsplash.com/users/charlesdeluvio/following",
                    "followers": "https://api.unsplash.com/users/charlesdeluvio/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1515694660956-9133b2f53e3b?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
                    "medium": "https://images.unsplash.com/profile-1515694660956-9133b2f53e3b?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
                    "large": "https://images.unsplash.com/profile-1515694660956-9133b2f53e3b?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"
                },
                "instagram_username": null,
                "total_collections": 136,
                "total_likes": 5261,
                "total_photos": 672,
                "total_promoted_photos": 294,
                "total_illustrations": 0,
                "total_promoted_illustrations": 0,
                "accepted_tos": true,
                "for_hire": false,
                "social": {
                    "instagram_username": null,
                    "portfolio_url": null,
                    "twitter_username": null,
                    "paypal_email": null
                }
            }
        },
        {
            "id": "DziZIYOGAHc",
            "slug": "black-pug-wearing-striped-apparel-DziZIYOGAHc",
            "alternative_slugs": {
                "en": "black-pug-wearing-striped-apparel-DziZIYOGAHc",
                "es": "pug-negro-con-ropa-a-rayas-DziZIYOGAHc",
                "ja": "縞模様のアパレルを着た黒いパグ-DziZIYOGAHc",
                "fr": "carlin-noir-portant-des-vetements-rayes-DziZIYOGAHc",
                "it": "carlino-nero-che-indossa-abbigliamento-a-righe-DziZIYOGAHc",
                "ko": "줄무늬-의류를-입은-블랙-퍼그-DziZIYOGAHc",
                "de": "schwarzer-mops-tragt-gestreifte-kleidung-DziZIYOGAHc",
                "pt": "pug-preto-vestindo-roupas-listradas-DziZIYOGAHc"
            },
            "created_at": "2018-01-31T18:31:36Z",
            "updated_at": "2024-10-11T14:39:55Z",
            "promoted_at": "2018-02-01T09:02:58Z",
            "width": 2683,
            "height": 3469,
            "color": "#c00c0c",
            "blur_hash": "LZIBJ.v#[=oLz=TIS2af}FRkJRoL",
            "description": "Doggy with style. (instagram.com/toshi.dog/)",
            "alt_description": "black pug wearing striped apparel",
            "breadcrumbs": [],
            "urls": {
                "raw": "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw2fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3",
                "full": "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw2fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=85",
                "regular": "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw2fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080",
                "small": "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw2fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400",
                "thumb": "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw2fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1517423440428-a5a00ad493e8"
            },
            "links": {
                "self": "https://api.unsplash.com/photos/black-pug-wearing-striped-apparel-DziZIYOGAHc",
                "html": "https://unsplash.com/photos/black-pug-wearing-striped-apparel-DziZIYOGAHc",
                "download": "https://unsplash.com/photos/DziZIYOGAHc/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw2fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA",
                "download_location": "https://api.unsplash.com/photos/DziZIYOGAHc/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw2fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA"
            },
            "likes": 2244,
            "liked_by_user": false,
            "current_user_collections": [],
            "sponsorship": null,
            "topic_submissions": {
                "animals": {
                    "status": "approved",
                    "approved_on": "2020-04-06T14:20:16Z"
                }
            },
            "asset_type": "photo",
            "user": {
                "id": "mA08QQzQf8Y",
                "updated_at": "2024-10-09T14:04:00Z",
                "username": "charlesdeluvio",
                "name": "charlesdeluvio",
                "first_name": "charlesdeluvio",
                "last_name": null,
                "twitter_username": null,
                "portfolio_url": null,
                "bio": "Graphic designer",
                "location": "Montreal",
                "links": {
                    "self": "https://api.unsplash.com/users/charlesdeluvio",
                    "html": "https://unsplash.com/@charlesdeluvio",
                    "photos": "https://api.unsplash.com/users/charlesdeluvio/photos",
                    "likes": "https://api.unsplash.com/users/charlesdeluvio/likes",
                    "portfolio": "https://api.unsplash.com/users/charlesdeluvio/portfolio",
                    "following": "https://api.unsplash.com/users/charlesdeluvio/following",
                    "followers": "https://api.unsplash.com/users/charlesdeluvio/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1515694660956-9133b2f53e3b?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
                    "medium": "https://images.unsplash.com/profile-1515694660956-9133b2f53e3b?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
                    "large": "https://images.unsplash.com/profile-1515694660956-9133b2f53e3b?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"
                },
                "instagram_username": null,
                "total_collections": 136,
                "total_likes": 5261,
                "total_photos": 672,
                "total_promoted_photos": 294,
                "total_illustrations": 0,
                "total_promoted_illustrations": 0,
                "accepted_tos": true,
                "for_hire": false,
                "social": {
                    "instagram_username": null,
                    "portfolio_url": null,
                    "twitter_username": null,
                    "paypal_email": null
                }
            }
        },
        {
            "id": "yihlaRCCvd4",
            "slug": "dog-running-on-beach-during-daytime-yihlaRCCvd4",
            "alternative_slugs": {
                "en": "dog-running-on-beach-during-daytime-yihlaRCCvd4",
                "es": "perro-corriendo-en-la-playa-durante-el-dia-yihlaRCCvd4",
                "ja": "昼間ビーチを走る犬-yihlaRCCvd4",
                "fr": "chien-courant-sur-la-plage-pendant-la-journee-yihlaRCCvd4",
                "it": "cane-che-corre-sulla-spiaggia-durante-il-giorno-yihlaRCCvd4",
                "ko": "낮에-해변에서-달리는-개-yihlaRCCvd4",
                "de": "hund-der-tagsuber-am-strand-lauft-yihlaRCCvd4",
                "pt": "cachorro-correndo-na-praia-durante-o-dia-yihlaRCCvd4"
            },
            "created_at": "2018-06-29T14:15:36Z",
            "updated_at": "2024-10-12T11:48:40Z",
            "promoted_at": "2018-06-30T14:58:13Z",
            "width": 4016,
            "height": 6016,
            "color": "#f3f3f3",
            "blur_hash": "L$Nm~Ht7tlof~VaeV@fk%gogaKax",
            "description": "Nova Scotia Duck Tolling Retriever for PuppyHero.com:\nhttps://puppyhero.com/breed/nova-scotia-duck-tolling-retriever",
            "alt_description": "dog running on beach during daytime",
            "breadcrumbs": [
                {
                    "slug": "images",
                    "title": "1,000,000+ Free Images",
                    "index": 0,
                    "type": "landing_page"
                },
                {
                    "slug": "animals",
                    "title": "Animals Images \u0026 Pictures",
                    "index": 1,
                    "type": "landing_page"
                },
                {
                    "slug": "dog",
                    "title": "Dog Images \u0026 Pictures",
                    "index": 2,
                    "type": "landing_page"
                }
            ],
            "urls": {
                "raw": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw3fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3",
                "full": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw3fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=85",
                "regular": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw3fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080",
                "small": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw3fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400",
                "thumb": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw3fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1530281700549-e82e7bf110d6"
            },
            "links": {
                "self": "https://api.unsplash.com/photos/dog-running-on-beach-during-daytime-yihlaRCCvd4",
                "html": "https://unsplash.com/photos/dog-running-on-beach-during-daytime-yihlaRCCvd4",
                "download": "https://unsplash.com/photos/yihlaRCCvd4/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw3fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA",
                "download_location": "https://api.unsplash.com/photos/yihlaRCCvd4/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw3fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA"
            },
            "likes": 2081,
            "liked_by_user": false,
            "current_user_collections": [],
            "sponsorship": null,
            "topic_submissions": {
                "animals": {
                    "status": "approved",
                    "approved_on": "2024-06-11T11:55:18Z"
                }
            },
            "asset_type": "photo",
            "user": {
                "id": "3kpmmkI-Gco",
                "updated_at": "2024-10-10T21:23:05Z",
                "username": "o5ky",
                "name": "Oscar Sutton",
                "first_name": "Oscar",
                "last_name": "Sutton",
                "twitter_username": "o5ky",
                "portfolio_url": "https://www.instagram.com/o5ky/",
                "bio": "I am an amature photographer who has a passion for getting the perfect shot.",
                "location": "UK",
                "links": {
                    "self": "https://api.unsplash.com/users/o5ky",
                    "html": "https://unsplash.com/@o5ky",
                    "photos": "https://api.unsplash.com/users/o5ky/photos",
                    "likes": "https://api.unsplash.com/users/o5ky/likes",
                    "portfolio": "https://api.unsplash.com/users/o5ky/portfolio",
                    "following": "https://api.unsplash.com/users/o5ky/following",
                    "followers": "https://api.unsplash.com/users/o5ky/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1503663739871-e0806dbe6f23?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
                    "medium": "https://images.unsplash.com/profile-1503663739871-e0806dbe6f23?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
                    "large": "https://images.unsplash.com/profile-1503663739871-e0806dbe6f23?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"
                },
                "instagram_username": "O5ky",
                "total_collections": 4,
                "total_likes": 71,
                "total_photos": 109,
                "total_promoted_photos": 13,
                "total_illustrations": 0,
                "total_promoted_illustrations": 0,
                "accepted_tos": true,
                "for_hire": true,
                "social": {
                    "instagram_username": "O5ky",
                    "portfolio_url": "https://www.instagram.com/o5ky/",
                    "twitter_username": "o5ky",
                    "paypal_email": null
                }
            }
        },
        {
            "id": "9gz3wfHr65U",
            "slug": "white-dog-and-gray-cat-hugging-each-other-on-grass-9gz3wfHr65U",
            "alternative_slugs": {
                "en": "white-dog-and-gray-cat-hugging-each-other-on-grass-9gz3wfHr65U",
                "es": "perro-blanco-y-gato-gris-abrazandose-en-la-hierba-9gz3wfHr65U",
                "ja": "草の上で抱き合う白い犬と灰色の猫-9gz3wfHr65U",
                "fr": "chien-blanc-et-chat-gris-setreignant-sur-lherbe-9gz3wfHr65U",
                "it": "cane-bianco-e-gatto-grigio-che-si-abbracciano-sullerba-9gz3wfHr65U",
                "ko": "흰-개와-회색-고양이가-풀밭에서-서로를-껴안고-있습니다-9gz3wfHr65U",
                "de": "weisser-hund-und-graue-katze-umarmen-sich-auf-gras-9gz3wfHr65U",
                "pt": "cao-branco-e-gato-cinza-se-abracando-na-grama-9gz3wfHr65U"
            },
            "created_at": "2015-12-22T10:10:12Z",
            "updated_at": "2024-10-13T04:58:50Z",
            "promoted_at": "2015-12-22T10:10:12Z",
            "width": 2896,
            "height": 1704,
            "color": "#262626",
            "blur_hash": "LZHeB@%gjujr~VxuE2snD%IVIVs.",
            "description": "Real life best friends",
            "alt_description": "white dog and gray cat hugging each other on grass",
            "breadcrumbs": [],
            "urls": {
                "raw": "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw4fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3",
                "full": "https://images.unsplash.com/photo-1450778869180-41d0601e046e?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw4fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=85",
                "regular": "https://images.unsplash.com/photo-1450778869180-41d0601e046e?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw4fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080",
                "small": "https://images.unsplash.com/photo-1450778869180-41d0601e046e?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw4fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400",
                "thumb": "https://images.unsplash.com/photo-1450778869180-41d0601e046e?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw4fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1450778869180-41d0601e046e"
            },
            "links": {
                "self": "https://api.unsplash.com/photos/white-dog-and-gray-cat-hugging-each-other-on-grass-9gz3wfHr65U",
                "html": "https://unsplash.com/photos/white-dog-and-gray-cat-hugging-each-other-on-grass-9gz3wfHr65U",
                "download": "https://unsplash.com/photos/9gz3wfHr65U/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw4fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA",
                "download_location": "https://api.unsplash.com/photos/9gz3wfHr65U/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw4fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA"
            },
            "likes": 3244,
            "liked_by_user": false,
            "current_user_collections": [],
            "sponsorship": null,
            "topic_submissions": {
                "animals": {
                    "status": "approved",
                    "approved_on": "2020-11-13T12:32:57Z"
                }
            },
            "asset_type": "photo",
            "user": {
                "id": "sPDX-kGAYMg",
                "updated_at": "2024-09-27T20:38:55Z",
                "username": "krista",
                "name": "Krista Mangulsone",
                "first_name": "Krista",
                "last_name": "Mangulsone",
                "twitter_username": null,
                "portfolio_url": "https://www.instagram.com/hey.krista/",
                "bio": null,
                "location": "Rīga",
                "links": {
                    "self": "https://api.unsplash.com/users/krista",
                    "html": "https://unsplash.com/@krista",
                    "photos": "https://api.unsplash.com/users/krista/photos",
                    "likes": "https://api.unsplash.com/users/krista/likes",
                    "portfolio": "https://api.unsplash.com/users/krista/portfolio",
                    "following": "https://api.unsplash.com/users/krista/following",
                    "followers": "https://api.unsplash.com/users/krista/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1573203105113-ee13e78a064bimage?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
                    "medium": "https://images.unsplash.com/profile-1573203105113-ee13e78a064bimage?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
                    "large": "https://images.unsplash.com/profile-1573203105113-ee13e78a064bimage?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"
                },
                "instagram_username": "hey.krista",
                "total_collections": 8,
                "total_likes": 160,
                "total_photos": 16,
                "total_promoted_photos": 2,
                "total_illustrations": 0,
                "total_promoted_illustrations": 0,
                "accepted_tos": true,
                "for_hire": true,
                "social": {
                    "instagram_username": "hey.krista",
                    "portfolio_url": "https://www.instagram.com/hey.krista/",
                    "twitter_username": null,
                    "paypal_email": null
                }
            }
        },
        {
            "id": "ShLDezSsZJk",
            "slug": "black-dog-sitting-on-boat-on-body-of-water-ShLDezSsZJk",
            "alternative_slugs": {
                "en": "black-dog-sitting-on-boat-on-body-of-water-ShLDezSsZJk",
                "es": "perro-negro-sentado-en-el-barco-en-el-cuerpo-de-agua-ShLDezSsZJk",
                "ja": "水域のボートに座っている黒い犬-ShLDezSsZJk",
                "fr": "chien-noir-assis-sur-un-bateau-sur-un-plan-deau-ShLDezSsZJk",
                "it": "cane-nero-che-si-siede-sulla-barca-sullo-specchio-dacqua-ShLDezSsZJk",
                "ko": "검은-개-물-위에-보트에-앉아-ShLDezSsZJk",
                "de": "schwarzer-hund-sitzt-auf-boot-auf-gewasser-ShLDezSsZJk",
                "pt": "cao-preto-sentado-no-barco-no-corpo-da-agua-ShLDezSsZJk"
            },
            "created_at": "2018-07-26T08:07:41Z",
            "updated_at": "2024-10-09T23:10:02Z",
            "promoted_at": null,
            "width": 2930,
            "height": 3910,
            "color": "#0c2626",
            "blur_hash": "LJEzAnDh?^xv_3M^Mebb9XawIUIA",
            "description": "Fly fishing on the Tweed for salmon, unsuccessfully. The dog was less than impressed by my casting....",
            "alt_description": "black dog sitting on boat on body of water",
            "breadcrumbs": [],
            "urls": {
                "raw": "https://images.unsplash.com/photo-1532592333381-a141e3f197c9?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw5fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3",
                "full": "https://images.unsplash.com/photo-1532592333381-a141e3f197c9?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw5fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=85",
                "regular": "https://images.unsplash.com/photo-1532592333381-a141e3f197c9?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw5fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080",
                "small": "https://images.unsplash.com/photo-1532592333381-a141e3f197c9?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw5fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400",
                "thumb": "https://images.unsplash.com/photo-1532592333381-a141e3f197c9?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw5fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1532592333381-a141e3f197c9"
            },
            "links": {
                "self": "https://api.unsplash.com/photos/black-dog-sitting-on-boat-on-body-of-water-ShLDezSsZJk",
                "html": "https://unsplash.com/photos/black-dog-sitting-on-boat-on-body-of-water-ShLDezSsZJk",
                "download": "https://unsplash.com/photos/ShLDezSsZJk/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw5fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA",
                "download_location": "https://api.unsplash.com/photos/ShLDezSsZJk/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHw5fHxkb2d8ZW58MHx8fHwxNzI4ODM4NjQzfDA"
            },
            "likes": 319,
            "liked_by_user": false,
            "current_user_collections": [],
            "sponsorship": null,
            "topic_submissions": {},
            "asset_type": "photo",
            "user": {
                "id": "RyKw5QU8WbY",
                "updated_at": "2024-10-11T13:00:17Z",
                "username": "john_cameron",
                "name": "John Cameron",
                "first_name": "John",
                "last_name": "Cameron",
                "twitter_username": null,
                "portfolio_url": null,
                "bio": "“That’s one trouble with dual identities, Robin. Dual responsibilities.” \r\n Bruce Wayne/Batman",
                "location": "London / Malaga",
                "links": {
                    "self": "https://api.unsplash.com/users/john_cameron",
                    "html": "https://unsplash.com/@john_cameron",
                    "photos": "https://api.unsplash.com/users/john_cameron/photos",
                    "likes": "https://api.unsplash.com/users/john_cameron/likes",
                    "portfolio": "https://api.unsplash.com/users/john_cameron/portfolio",
                    "following": "https://api.unsplash.com/users/john_cameron/following",
                    "followers": "https://api.unsplash.com/users/john_cameron/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1569249522831-999b6a2795e1image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
                    "medium": "https://images.unsplash.com/profile-1569249522831-999b6a2795e1image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
                    "large": "https://images.unsplash.com/profile-1569249522831-999b6a2795e1image?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"
                },
                "instagram_username": "goodgollyitsdolly",
                "total_collections": 57,
                "total_likes": 107,
                "total_photos": 834,
                "total_promoted_photos": 24,
                "total_illustrations": 0,
                "total_promoted_illustrations": 0,
                "accepted_tos": true,
                "for_hire": false,
                "social": {
                    "instagram_username": "goodgollyitsdolly",
                    "portfolio_url": null,
                    "twitter_username": null,
                    "paypal_email": null
                }
            }
        },
        {
            "id": "Mv9hjnEUHR4",
            "slug": "black-pug-with-gray-knit-scarf-Mv9hjnEUHR4",
            "alternative_slugs": {
                "en": "black-pug-with-gray-knit-scarf-Mv9hjnEUHR4",
                "es": "pug-negro-con-bufanda-de-punto-gris-Mv9hjnEUHR4",
                "ja": "ブラックパグにグレーのニットスカーフ-Mv9hjnEUHR4",
                "fr": "carlin-noir-avec-echarpe-en-tricot-gris-Mv9hjnEUHR4",
                "it": "carlino-nero-con-sciarpa-in-maglia-grigia-Mv9hjnEUHR4",
                "ko": "블랙-퍼그-그레이-니트-스카프-Mv9hjnEUHR4",
                "de": "schwarzer-mops-mit-grauem-strickschal-Mv9hjnEUHR4",
                "pt": "pug-preto-com-lenco-de-malha-cinza-Mv9hjnEUHR4"
            },
            "created_at": "2018-02-05T16:58:13Z",
            "updated_at": "2024-10-11T03:58:05Z",
            "promoted_at": "2018-02-06T12:32:01Z",
            "width": 3024,
            "height": 4032,
            "color": "#f3c00c",
            "blur_hash": "LlMiSjxB^ct5}%NfItWC%KskIsj[",
            "description": "Toshi wearing a knit sweater.",
            "alt_description": "black pug with gray knit scarf",
            "breadcrumbs": [
                {
                    "slug": "images",
                    "title": "1,000,000+ Free Images",
                    "index": 0,
                    "type": "landing_page"
                },
                {
                    "slug": "feelings",
                    "title": "Feelings Images",
                    "index": 1,
                    "type": "landing_page"
                },
                {
                    "slug": "funny",
                    "title": "Funny Images \u0026 Pictures",
                    "index": 2,
                    "type": "landing_page"
                }
            ],
            "urls": {
                "raw": "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwxMHx8ZG9nfGVufDB8fHx8MTcyODgzODY0M3ww\u0026ixlib=rb-4.0.3",
                "full": "https://images.unsplash.com/photo-1517849845537-4d257902454a?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwxMHx8ZG9nfGVufDB8fHx8MTcyODgzODY0M3ww\u0026ixlib=rb-4.0.3\u0026q=85",
                "regular": "https://images.unsplash.com/photo-1517849845537-4d257902454a?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwxMHx8ZG9nfGVufDB8fHx8MTcyODgzODY0M3ww\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080",
                "small": "https://images.unsplash.com/photo-1517849845537-4d257902454a?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwxMHx8ZG9nfGVufDB8fHx8MTcyODgzODY0M3ww\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400",
                "thumb": "https://images.unsplash.com/photo-1517849845537-4d257902454a?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwxMHx8ZG9nfGVufDB8fHx8MTcyODgzODY0M3ww\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1517849845537-4d257902454a"
            },
            "links": {
                "self": "https://api.unsplash.com/photos/black-pug-with-gray-knit-scarf-Mv9hjnEUHR4",
                "html": "https://unsplash.com/photos/black-pug-with-gray-knit-scarf-Mv9hjnEUHR4",
                "download": "https://unsplash.com/photos/Mv9hjnEUHR4/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwxMHx8ZG9nfGVufDB8fHx8MTcyODgzODY0M3ww",
                "download_location": "https://api.unsplash.com/photos/Mv9hjnEUHR4/download?ixid=M3w2NTgzOTR8MHwxfHNlYXJjaHwxMHx8ZG9nfGVufDB8fHx8MTcyODgzODY0M3ww"
            },
            "likes": 3388,
            "liked_by_user": false,
            "current_user_collections": [],
            "sponsorship": null,
            "topic_submissions": {
                "ugc": {
                    "status": "rejected"
                },
                "animals": {
                    "status": "approved",
                    "approved_on": "2020-04-06T14:20:16Z"
                }
            },
            "asset_type": "photo",
            "user": {
                "id": "mA08QQzQf8Y",
                "updated_at": "2024-10-09T14:04:00Z",
                "username": "charlesdeluvio",
                "name": "charlesdeluvio",
                "first_name": "charlesdeluvio",
                "last_name": null,
                "twitter_username": null,
                "portfolio_url": null,
                "bio": "Graphic designer",
                "location": "Montreal",
                "links": {
                    "self": "https://api.unsplash.com/users/charlesdeluvio",
                    "html": "https://unsplash.com/@charlesdeluvio",
                    "photos": "https://api.unsplash.com/users/charlesdeluvio/photos",
                    "likes": "https://api.unsplash.com/users/charlesdeluvio/likes",
                    "portfolio": "https://api.unsplash.com/users/charlesdeluvio/portfolio",
                    "following": "https://api.unsplash.com/users/charlesdeluvio/following",
                    "followers": "https://api.unsplash.com/users/charlesdeluvio/followers"
                },
                "profile_image": {
                    "small": "https://images.unsplash.com/profile-1515694660956-9133b2f53e3b?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
                    "medium": "https://images.unsplash.com/profile-1515694660956-9133b2f53e3b?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
                    "large": "https://images.unsplash.com/profile-1515694660956-9133b2f53e3b?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"
                },
                "instagram_username": null,
                "total_collections": 136,
                "total_likes": 5261,
                "total_photos": 672,
                "total_promoted_photos": 294,
                "total_illustrations": 0,
                "total_promoted_illustrations": 0,
                "accepted_tos": true,
                "for_hire": false,
                "social": {
                    "instagram_username": null,
                    "portfolio_url": null,
                    "twitter_username": null,
                    "paypal_email": null
                }
            }
        }
    ]
}

const ImageSearch = ({ setValue, setSelectedFileUrl, setChooseToggle }) => {

    const [input, setInput] = useState("dog");
    const [images, setImages] = useState(null);
    const [show, setShow] = useState(false);

    const fetchImages = async () => {
        console.log(input);

        //     let { data } = await axios(`https://api.unsplash.com/search/photos?query=${input}&per_Page=28&P=1&client_id=${"i-cJCQnO7I484JKFHfglJQUMUPBhPX2yI6lJS1tYmlU"}`);
        //     console.log(data);
        // setImages(data.results);
        setImages(result.results);
        setChooseToggle("link")
    }

    const handleImage = (image_url) => {
        console.log(image_url);
        setValue("file", image_url)
        setSelectedFileUrl(image_url)
        setShow(!show)
    }

    return (
        <div className='flex flex-col gap-5'>

            <MyImage className={"w-[20px] h-[20px]"} src={searchIcon} onClick={() => setShow(!show)} />

            <MainSlider show={show} setShow={setShow} height='50%'>
                <div className='flex flex-col gap-5'>
                    {/* INPUT FOR SEARCH */}
                    <div className='w-full flex items-center justify-between bg-bgInput1 border-2 border-white rounded-lg overflow-hidden px-2'>
                        <input className='w-full bg-transparent p-2' type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Search...' />
                        <MyImage className={"w-[25px] h-[25px]"} src={searchIcon} onClick={fetchImages} />
                    </div>

                    {/* SHOWING IMAGES */}
                    <div className='w-full flex flex-wrap gap-4'>
                        {
                            images?.map((e) => (
                                <div key={e.id}>
                                    <MyImage className={"w-[200px] h-[200px]"} src={e.urls.regular} onClick={() => handleImage(e.urls.regular)} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </MainSlider>


        </div>
    )
}

export default ImageSearch