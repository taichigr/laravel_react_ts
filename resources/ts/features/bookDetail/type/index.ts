export interface IndustryIdentifier {
    type: string;
    identifier: string;
}

export interface ReadingModes {
    text: boolean;
    image: boolean;
}

export interface Dimensions {
    height: string;
    width: string;
    thickness: string;
}

export interface PanelizationSummary {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
}

export interface VolumeInfo {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: IndustryIdentifier[];
    readingModes: ReadingModes;
    pageCount: number;
    printedPageCount: number;
    dimensions: Dimensions;
    printType: string;
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: PanelizationSummary;
    imageLinks: ImageLinks;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
}

export interface SaleInfo {
    country: string;
    saleability: string;
    isEbook: boolean;
}

export interface Epub {
    isAvailable: boolean;
}

export interface Pdf {
    isAvailable: boolean;
}

export interface AccessInfo {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: Epub;
    pdf: Pdf;
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
}

export interface BookVolume {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
}
