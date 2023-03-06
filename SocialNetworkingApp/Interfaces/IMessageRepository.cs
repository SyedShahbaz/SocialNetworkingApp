using System.Collections.Generic;
using System.Threading.Tasks;
using SocialNetworkingApp.DTOs;
using SocialNetworkingApp.Entities;
using SocialNetworkingApp.Helpers;

namespace SocialNetworkingApp.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessage(int id);
        Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserName, string recipientUserName);
        Task<bool> SaveAllAsync();
    }
}