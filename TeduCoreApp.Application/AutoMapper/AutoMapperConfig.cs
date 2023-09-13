using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace TeduCoreApp.Application.AutoMapper
{
    public class AutoMapperConfig
    {
         public static  MapperConfiguration RegisterMappings()
        {
            return new MapperConfiguration(config =>
            {
                config.AddProfile(new DomainToViewModelMappingProfile());
                config.AddProfile(new ViewModelToDomainMappingProfile());
            });
        }
    }
}
