export class RepoStats {
    owner: string
    repo: string
    authors: RepoAuthor[]
    totalLinesOfCode: number
    totalFileCount: number
    lastCommit: string
}


export class RepoAuthor {
    name: string
    email: string
    image: string
    linesOfCode: string
    fileCount: string
    availablePaymentMethods: { paymentType: any, destination: string }[]
}