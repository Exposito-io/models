import { expect } from 'chai'
import { ExpositoError, ErrorCode } from '../models/exposito-error'
import { Project } from '../models/project'
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
                hosting: HostingType.Aws,
                members: [],
                shareholders: []
            })
        }).to.throw()

    })


})