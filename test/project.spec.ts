import { expect } from 'chai'
import { ExpositoError, ErrorCode } from '../models/exposito-error'
import { Project, CreateProjectParams } from '../models/project'
import { HostingType } from '../models/hosting-type'


describe('Project', () => {


    beforeEach(() => {

    })

    it('fromParams should throw on invalid name', () => {

        expect(() => {
            let project = Project.fromParams({
                name: undefined,
                description: '',
                githubProjects: [],
                members: [],
                shareholders: []
            })
        }).to.throw()

        expect(() => {
            let project = Project.fromParams({
                name: 2,
                description: '',
                githubProjects: [],
                hosting: HostingType.Aws,
                members: [],
                shareholders: []
            } as any)
        }).to.throw()                

    })


    it('fromParams should throw on invalid description', () => {
        expect(() => {
            let project = Project.fromParams({
                name: '',
                description: undefined,
                githubProjects: [],
                hosting: HostingType.Aws,
                members: [],
                shareholders: []
            } as any)
        }).to.throw()  

        expect(() => {
            let project = Project.fromParams({
                name: '',
                description: 234,
                githubProjects: [],
                hosting: HostingType.Aws,
                members: [],
                shareholders: []
            } as any)
        }).to.throw()          
    })


})