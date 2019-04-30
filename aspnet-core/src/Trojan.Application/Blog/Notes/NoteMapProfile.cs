using AutoMapper;

namespace Trojan.Blog.Notes
{
    public class NoteMapProfile : Profile
    {
        public NoteMapProfile()
        {
            CreateMap<CreateNoteDto, Note>();
            CreateMap<UpdateNoteDto, Note>();
            CreateMap<PublicNoteDto, Note>();
            //使用自定义解析
            CreateMap<Note, NoteDto>().ForMember(x => x.CreationTime, opt =>
            {
                //opt.ResolveUsing<NoteToNoteDtoResolver>();
                opt.MapFrom<NoteToNoteDtoResolver>();
            });
            CreateMap<Note, PublicNoteDto>();
        }
    }


    /// <summary>
    /// 自定义解析
    /// </summary>
    public class NoteToNoteDtoResolver : IValueResolver<Note, NoteDto, string>
    {
        public string Resolve(Note source, NoteDto destination, string destMember, ResolutionContext context)
        {
            return string.Format("{0:F}", source.CreationTime);
        }
    }


}
