import * as moment from "moment";

export class AuditModelMapper {
    public static map(records: any[]) :any[] {
        var model: any;
        var result: any[] = new Array();
        for (let i = 0; i < records.length; i++) {
            model = new Object();
            if (records[i].hasOwnProperty('revisionDate')) {
              model.actionDate = moment(records[i].revisionDate).format("MM/DD/YYYY hh:mm A")
            }
            model.uuid = records[i].uuid
            model.entity = records[i].entity;
            model.entityName = records[i].entityName
            switch (records[i].revisionType) {
              case 'ADD':
                model.actionType = 'created'
                break;
              case 'MOD':
                model.actionType = 'modified'
                break;
              case 'Deleted':
                model.actionType = 'deleted'
                break;
            }
            result.push(model)
          }
          return result;
    }
}