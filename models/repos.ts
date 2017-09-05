export class RepoStats {
    authors: RepoAuthor[]
    totalLinesOfCode: string
    totalFileCount: string
}


export class RepoAuthor {
    name: string
    email: string
    image: string
    linesOfCode: string
    fileCount: string
    availablePaymentMethods: { paymentType: any, destination: string }[]
}