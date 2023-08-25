import _ from "lodash";

export const schemaValidation = (schema:any, data:any) => {
  const config = {
    abortEarly :false
  }
  const { error, value } = schema.validate(data, config);
  
  if (error) {
    const messages = _.map(error.details, "message")
    throw messages
  }

}